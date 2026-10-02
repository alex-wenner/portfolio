import type { Project } from "../content";
import styles from "./ProjectReadme.module.css";

export function ProjectReadme({ project }: { project: Project }) {
  const { caseStudy: cs } = project;
  return (
    <div className={styles.readme} data-file={`── ${project.slug}/README.md `}>
      <div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.meta}>{project.period} · {project.role}</p>
        {cs.problem && <p className={styles.p}><span className={styles.label}>## why</span><br />{cs.problem}</p>}
        {cs.built.length > 0 && (
          <>
            <p className={styles.label}>## what I built</p>
            <ul className={styles.built}>{cs.built.map((b) => <li key={b}>{b}</li>)}</ul>
          </>
        )}
        {cs.architecture && <p className={styles.p}><span className={styles.label}>## how it works</span><br />{cs.architecture}</p>}
        <p className={styles.label}>## stack</p>
        <ul className={styles.tags} aria-label={`${project.title} tech stack`}>
          {project.stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
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
