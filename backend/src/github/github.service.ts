import { Injectable } from "@nestjs/common";
import { slack_integration } from "@prisma/client";
import { WebClient } from "@slack/web-api";
import { GithubEvent } from "types/githubEventTypes";
import { PrismaService } from "../prisma/prisma.service";
import { GithubEventHandler } from "./GithubEventHandler";

export interface TokenResponse {
  access_token: string;
  scope: string;
  token_type: string;
}

@Injectable()
export class GithubService {
  slackClient: WebClient;

  // TODO: need to get this from the prisma client
  // channelId = "C03GBF3FCNR";

  constructor(private prisma: PrismaService) {
    this.slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);
  }

  private async getChannelId(repositoryId: number): Promise<slack_integration> {
    const githubRepository = await this.prisma.github_repositories.findUnique({
      where: {
        repository_id: repositoryId.toString(),
      },
    });

    const slackIntegration = await this.prisma.slack_integration.findUnique({
      where: {
        team: githubRepository.team_id,
      },
    });

    return slackIntegration;
  }

  async handleEvent(body: GithubEvent) {
    console.log(body);
    if (body.pull_request && body.pull_request.id && body.repository.id) {
      const integration = await this.getChannelId(body.repository.id);

      console.log("Found channel id: ", integration.channel_id);

      new GithubEventHandler(
        this.prisma,
        this.slackClient,
        integration.channel_id,
        integration.access_token,
      ).handleEvent(body);
    } else {
      console.log("Got non PR body: ");
      console.log(body);
    }
  }
}
