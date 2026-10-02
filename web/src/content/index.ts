import { projects } from "./projects";
import { ProjectCatalog } from "./ProjectCatalog";

export const catalog = new ProjectCatalog(projects);
export * from "./types";
