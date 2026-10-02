/// <reference path="./.sst/platform/config.d.ts" />

const APP_NAME = "AlexPortfolio";
const ALLOWED_STAGES = new Set(["nonprod", "prod", "pr"]);

export default $config({
  app(input) {
    const stage = input?.stage ?? "nonprod";
    if (!ALLOWED_STAGES.has(stage)) {
      throw new Error(`Invalid stage "${stage}". Allowed: ${[...ALLOWED_STAGES].join(", ")}.`);
    }
    return {
      name: APP_NAME,
      removal: stage === "prod" ? "retain" : "remove",
      home: "aws",
      providers: { aws: { region: "us-east-1" } },
    };
  },
  async run() {
    const { WebStack } = await import("./stacks/web-stack");
    const web = new WebStack($app.stage).create();
    return { WebUrl: web.site.url };
  },
});
