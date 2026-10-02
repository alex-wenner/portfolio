/// <reference path="../.sst/platform/config.d.ts" />

import { stackName } from "./naming";

const SITE_URL = "https://d12v35euggcetk.cloudfront.net";

export class WebStack {
  constructor(private readonly stage: string) {}

  create() {
    // GAP: no custom domain yet; served from the default CloudFront URL.
    // Social preview tags need an absolute URL at build time, so the current
    // distribution URL is pinned here. Swap for the real domain when there is one.
    const site = new sst.aws.StaticSite(stackName("Web", this.stage), {
      path: "../web",
      build: { command: "npm run build", output: "dist" },
      environment: {
        VITE_STAGE: this.stage,
        VITE_SITE_URL: SITE_URL,
      },
    });
    return { site };
  }
}

export type WebStackOutputs = ReturnType<WebStack["create"]>;
