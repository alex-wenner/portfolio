export type ProjectTier = "featured" | "tooling" | "client" | "studio";
export type Visibility = "public" | "private";

export interface CaseStudy {
  problem: string;
  built: string[];
  architecture: string;
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
