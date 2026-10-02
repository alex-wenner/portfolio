import { ProjectCatalog } from "../src/content/ProjectCatalog";
import { projects } from "../src/content/projects";

describe("ProjectCatalog", () => {
  const catalog = new ProjectCatalog(projects);

  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("puts every project in exactly one section", () => {
    const tiers = ["featured", "tooling", "client", "studio"] as const;
    const total = tiers.reduce((n, t) => n + catalog.byTier(t).length, 0);
    expect(total).toBe(projects.length);
  });

  it("gives every project expanded copy", () => {
    for (const p of projects) {
      expect(p.caseStudy.built.length, p.slug).toBeGreaterThan(0);
      expect(p.stack.length, p.slug).toBeGreaterThan(0);
    }
  });

  it("never links code for private projects", () => {
    for (const p of projects.filter((p) => p.visibility === "private")) {
      expect(p.repoUrl).toBeUndefined();
    }
  });

  it("excludes rapidstack", () => {
    expect(projects.some((p) => /rapidstack/i.test(p.slug + (p.repoUrl ?? "")))).toBe(false);
  });

  it("finds a project by slug", () => {
    expect(catalog.bySlug("nightscene")?.title).toBe("NightScene");
    expect(catalog.bySlug("missing")).toBeUndefined();
  });
});
