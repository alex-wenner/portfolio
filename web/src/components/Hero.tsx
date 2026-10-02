import { useRef, useState } from "react";
import { catalog } from "../content";
import { useTypewriter } from "../hooks/useTypewriter";
import { Cursor, Prompt } from "./Terminal";
import { ProjectReadme } from "./ProjectReadme";
import styles from "./Hero.module.css";

const NAME = "Alex Wenner.";
const ROLE = "full-stack engineer · aws, sst, react, python";

export function Hero() {
  const typed = useTypewriter(NAME, 38);
  const studio = catalog.byTier("studio")[0];
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  const close = () => { setOpen(false); btn.current?.focus(); };

  return (
    <section className={styles.hero} aria-label="Intro">
      <Prompt cmd="whoami" />
      <h1 className={styles.title}>
        <span className="sr-only">{NAME}</span>
        <span aria-hidden="true" data-testid="typed">{typed}</span>
        <Cursor />
      </h1>
      <p className={styles.role}># {ROLE}</p>
      {studio && (
        <>
          <p className={styles.role}>
            <button
              ref={btn}
              type="button"
              className={styles.studio}
              aria-expanded={open}
              aria-controls={`readme-${studio.slug}`}
              onClick={() => setOpen((o) => !o)}
              onKeyDown={(e) => { if (e.key === "Escape" && open) { e.preventDefault(); setOpen(false); } }}
            >
              # founder · <span className={styles.studioName}>{studio.slug}</span> {open ? "▾" : "▸"}
            </button>
          </p>
          <div
            id={`readme-${studio.slug}`}
            role="region"
            aria-label={`${studio.title} README`}
            hidden={!open}
            onKeyDown={(e) => { if (e.key === "Escape") { e.stopPropagation(); close(); } }}
          >
            {open && <ProjectReadme headingLevel={2} project={studio} />}
          </div>
        </>
      )}
    </section>
  );
}
