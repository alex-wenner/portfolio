import type { Project } from "../content";
import styles from "./ProjectReadme.module.css";

export function ProjectReadme({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const { caseStudy: cs } = project;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className={styles.readme} data-file={`── ${project.slug}/README.md `}>
      <div>
        <Heading className={styles.title}>{project.title}</Heading>
        <p className={styles.meta}>{project.period} · {project.role}</p>
        <p className={`${styles.chip} ${styles[cs.status.state]}`}>
          <span className="sr-only">status: </span>
          {cs.status.state}
        </p>
        {cs.problem && (
          <p className={styles.problem}>
            <span className="sr-only">problem: </span>
            {cs.problem}
          </p>
        )}
        <Section label="use case" text={cs.useCase} />
        {cs.approach.length > 0 && (
          <>
            <p className={styles.label}>## approach</p>
            <ul className={styles.built}>{cs.approach.map((b) => <li key={b}>{b}</li>)}</ul>
          </>
        )}
        <p className={styles.label}>## stack</p>
        <ul className={styles.tags} aria-label={`${project.title} tech stack`}>
          {project.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
        <Section label="status" text={cs.status.note} />
        <p className={styles.links}>
          {project.repoUrl && <a href={project.repoUrl}>$ git clone {project.repoUrl.replace("https://", "")}</a>}
          {project.liveUrl && <a href={project.liveUrl}>$ open {project.liveUrl.replace("https://", "")}</a>}
          {!project.repoUrl && <span className={styles.note}># source is private</span>}
        </p>
      </div>
      {project.images[0] && <img className={styles.img} src={project.images[0]} alt={`${project.title} screenshot`} />}
    </div>
  );
}

function Section({ label, text }: { label: string; text: string }) {
  if (!text) return null;
  return (
    <p className={styles.p}>
      <span className={styles.label}>## {label}</span>
      <br />
      {text}
    </p>
  );
}
