export const APP_NAME = "AlexPortfolio";

export function stackName(name: string, stage: string) {
  return `${APP_NAME}-${name}-${stage}`;
}
