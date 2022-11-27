import { WebClient } from "@slack/web-api";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextApiResponse } from "next";
import { withAxiom } from "next-axiom";
import { AxiomAPIRequest } from "next-axiom/dist/withAxiom";
import { verifySecret } from "verify-github-webhook-secret";
import { GithubEventHandler } from "../../../../components/api/gh/events/GithubEventHandler";
import { flattenType } from "../../../../components/api/utils/apiUtils";
import { analytics } from "../../../../components/api/utils/segment";
import withApiSupabase from "../../../../components/api/utils/withApiSupabase";
import { Organization } from "../../../../components/organization/shared";
import { GithubEvent } from "../../../../github-event-types";

const handler = async (
  req: AxiomAPIRequest,
  res: NextApiResponse,
  supabaseClient: SupabaseClient,
): Promise<void> => {
  const body = req.body as GithubEvent;

  const validEvent = await verifySecret(
    req,
    process.env.GITHUB_WEBHOOK_SECRET!,
  );

  if (!validEvent) {
    req.log.error("Got event with invalid signature");
    return res.status(403).send({ error: "Invalid signature" });
  }

  req.log.info("Got Github Event", {
    action: body?.action,
    number: body?.number,
    pullRequestId: body.pull_request?.id,
  });

  analytics.track({
    event: "Got GH Event",
    userId: body?.sender?.login ?? "unknown",
    properties: {
      body: body,
      env: process.env.NODE_ENV ?? "development",
    },
  });

  if (body?.pull_request && body?.pull_request.id && body?.repository.id) {
    const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

    const { data: githubRepository, error } = await supabaseClient
      .from("github_repositories")
      .select(
        `
        id,
        organization:organizations (*)
      `,
      )
      .eq("repository_id", Number(body?.repository.id))
      .limit(1)
      .single();

    const organization = flattenType<Organization>(
      githubRepository?.organization,
    );

    if (error) {
      req.log.info("Error finding Github Repository: ", error);
      return res.status(500).send({ error: "Error finding Github Repository" });
    }

    if (!organization) {
      req.log.warn("No organization found for repository_id: ", {
        orgId: body.repository.id,
      });
      return res.status(404).send({ error: "No organization found" });
    }

    const { data: slackIntegration, error: slackIntegrationError } =
      await supabaseClient
        .from("slack_integration")
        .select("*")
        .eq("organization_id", organization.id)
        .limit(1)
        .single();

    if (slackIntegrationError) {
      req.log.warn("Error finding Slack Integration: ", slackIntegrationError);
      return res.status(404).send({ error: "No organization found" });
    }

    // Flush the events now so we're guranteed to get at least something in the logs
    // in the event that the logs are too big to fully send later one
    await req.log.flush();

    const eventHandler = new GithubEventHandler(
      supabaseClient,
      slackClient,
      slackIntegration.channel_id,
      slackIntegration.access_token,
      organization.installation_id,
      req.log,
      organization.id,
    );

    try {
      await eventHandler.handleEvent(body);
    } catch (error) {
      req.log.error(`Got error handling event`, error);
      return res.status(400).send({ error: "Error handling event" });
    }
  }

  return res.status(200).send({ data: "OK" });
};

export default withAxiom(withApiSupabase(handler));
