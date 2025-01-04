import { getDns } from "./dns";
import { table } from "./storage";

const ghClientId = new sst.Secret("GithubClientId");
const ghClientSecret = new sst.Secret("GithubClientSecret");

export const auth = new sst.aws.Auth("Auth", {
  authorizer: {
    link: [table, ghClientId, ghClientSecret],
    handler: "./packages/functions/src/auth/authServer.handler",
    url: true,
  },
  forceUpgrade: "v2",
});

export const authRouter = new sst.aws.Router("AuthRouter", {
  routes: {
    "/*": auth.url,
  },
  domain: getDns("auth"),
});
