import styles from "./StatusBar.module.css";

const WINDOWS = [
  { href: "#products", label: "work" },
  { href: "#tools", label: "tools" },
  { href: "#clients", label: "clients" },
  { href: "#stack", label: "stack" },
  { href: "https://github.com/alex-wenner", label: "github" },
];

export function StatusBar({ stage }: { stage: string }) {
  return (
    <nav className={styles.status} aria-label="Sections">
      <ul>
        {WINDOWS.map((w, i) => (
          <li key={w.href}><a href={w.href}>{i}:{w.label}</a></li>
        ))}
      </ul>
      <span className={styles.meta}>stage:{stage} · us-east-1</span>
    </nav>
  );
}
