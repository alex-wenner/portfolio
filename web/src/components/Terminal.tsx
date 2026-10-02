import type { ReactNode } from "react";
import styles from "./Terminal.module.css";

export function TerminalWindow({ title, children, footer }: { title: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className={styles.win}>
      <div className={styles.bar} aria-hidden="true">
        <i className={styles.dot} />
        <i className={styles.dot} />
        <i className={styles.dot} />
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
      {footer}
    </div>
  );
}

export function Prompt({ cmd, as: Tag = "div", id }: { cmd?: string; as?: "div" | "h2"; id?: string }) {
  return (
    <Tag className={styles.prompt} id={id}>
      <b>alex@wenner</b> ~ $ {cmd ? <span className={styles.cmd}>{cmd}</span> : <Cursor />}
    </Tag>
  );
}

export function Cursor() {
  return <span className={styles.cursor} aria-hidden="true" />;
}

export function Block({ id, cmd, children }: { id?: string; cmd: string; children: ReactNode }) {
  const headingId = id ? `${id}-cmd` : undefined;
  return (
    <section id={id} className={styles.block} aria-labelledby={headingId}>
      <Prompt cmd={cmd} as="h2" id={headingId} />
      {children}
    </section>
  );
}
