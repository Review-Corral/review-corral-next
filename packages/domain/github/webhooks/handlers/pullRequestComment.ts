import { PullRequestReviewCommentCreatedEvent } from "@octokit/webhooks-types";
import { Logger } from "../../../logging";
import { GithubWebhookEventHander } from "../types";
import { getSlackUserName, getThreadTs } from "./shared";

const LOGGER = new Logger("core.github.webhooks.handlers.pullRequest");

export const handlePullRequestCommentEvent: GithubWebhookEventHander<
  PullRequestReviewCommentCreatedEvent
> = async ({ event, slackClient, ...args }) => {
  if (event.action === "created" && event.comment.user.type === "User") {
    const threadTs = await getThreadTs({
      prId: event.pull_request.id,
      repoId: event.repository.id,
    });

    if (!threadTs) {
      // write error log
      LOGGER.warn("Got a comment event but couldn't find the thread", {
        action: event.action,
        prId: event.pull_request.id,
      });

      return;
    }

    await slackClient.postComment({
      prId: event.pull_request.id,
      commentBody: event.comment.body,
      commentUrl: event.comment.html_url,
      threadTs: threadTs,
      slackUsername: await getSlackUserName(event.sender.login, args),
    });
    return;
  }
};
