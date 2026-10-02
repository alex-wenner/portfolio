export type ProjectTier = "featured" | "tooling" | "client" | "studio";
export type Visibility = "public" | "private";

export const STATUS_STATES = ["live", "active", "early", "archived"] as const;
export type StatusState = (typeof STATUS_STATES)[number];
export interface ProjectStatus {
  state: StatusState;
  note: string;
}

/** Expanded README panel, business first: problem, who it's for, approach, status. */
export interface CaseStudy {
  /** The business or user problem, in one or two plain sentences. */
  problem: string;
  /** Who has the problem and the concrete situation they use it in. */
  useCase: string;
  /** How the product solves it (a few short points). */
  approach: string[];
  /** Current state, shown as a chip, plus a one-line outcome or next step. */
  status: ProjectStatus;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  tier: ProjectTier;
  stack: string[];
  role: string;
  period: string;
  visibility: Visibility;
  repoUrl?: string;
  liveUrl?: string;
  images: string[];
  caseStudy: CaseStudy;
}
