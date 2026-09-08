/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "alex-wenner-portfolio",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: input?.stage === "production",
      home: "aws",
    };
  },
  async run() {
    const site = new sst.aws.StaticSite("Portfolio", {
      path: ".",
      build: {
        command: "npm run build",
        output: "dist",
      },
    });

    return { url: site.url };
  },
});
