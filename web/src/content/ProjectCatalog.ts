import type { Project, ProjectTier } from "./types";

export class ProjectCatalog {
  constructor(private readonly items: readonly Project[]) {}

  all(): readonly Project[] {
    return this.items;
  }

  byTier(tier: ProjectTier): Project[] {
    return this.items.filter((p) => p.tier === tier);
  }

  bySlug(slug: string): Project | undefined {
    return this.items.find((p) => p.slug === slug);
  }
}
