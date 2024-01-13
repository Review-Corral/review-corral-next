import { SSTConfig } from "sst";
import { AuthStack } from "./stacks/AuthStack";
import { FrontendStack } from "./stacks/FrontendStack";
import { MainStack } from "./stacks/MainStack";
import { PersistedStack } from "./stacks/PersistedStack";

export default {
  config(_input) {
    return {
      name: "review-corral",
      region: "us-east-1",
      profile: "rc",
    };
  },
  stacks(app) {
    app
      .stack(PersistedStack)
      .stack(MainStack)
      .stack(AuthStack)
      .stack(FrontendStack);
  },
} satisfies SSTConfig;
