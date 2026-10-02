import { useRef, useState, type KeyboardEvent } from "react";
import type { Project } from "../content";
import { ProjectReadme } from "./ProjectReadme";
import styles from "./ProjectList.module.css";

/**
 * Terminal-style project list. Each row is a native button, so Tab moves and Enter/Space toggle.
 * Several rows can be open at once; Escape inside a panel closes it and returns focus to its row.
 */
export function ProjectList({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<ReadonlySet<string>>(new Set());
  const buttons = useRef(new Map<string, HTMLButtonElement>());

  const toggle = (slug: string, next?: boolean) =>
    setOpen((prev) => {
      const s = new Set(prev);
      const shouldOpen = next ?? !s.has(slug);
      if (shouldOpen) s.add(slug); else s.delete(slug);
      return s;
    });

  const onPanelKeyDown = (slug: string) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Escape") return;
    e.stopPropagation();
    toggle(slug, false);
    buttons.current.get(slug)?.focus();
  };

  return (
    <ul className={styles.list}>
      {projects.map((p) => {
        const isOpen = open.has(p.slug);
        const panelId = `readme-${p.slug}`;
        const buttonId = `row-${p.slug}`;
        return (
          <li key={p.slug} className={isOpen ? styles.open : undefined}>
            <button
              type="button"
              id={buttonId}
              ref={(el) => { if (el) buttons.current.set(p.slug, el); else buttons.current.delete(p.slug); }}
              className={styles.row}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(p.slug)}
              onKeyDown={(e) => { if (e.key === "Escape" && isOpen) { e.preventDefault(); toggle(p.slug, false); } }}
            >
              <span className={styles.caret} aria-hidden="true">{isOpen ? "▾" : "▸"}</span>
              <span className={styles.name}>{p.slug}/</span>
              <span className={styles.tagline}>{p.tagline}</span>
              <span className={p.visibility === "public" ? styles.pub : styles.priv}>{p.visibility}</span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={styles.panel}
              onKeyDown={onPanelKeyDown(p.slug)}
            >
              {isOpen && <ProjectReadme project={p} />}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
