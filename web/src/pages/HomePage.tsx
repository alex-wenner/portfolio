import { catalog } from "../content";
import { Hero } from "../components/Hero";
import { Block, Prompt } from "../components/Terminal";
import { ProjectList } from "../components/ProjectList";
import styles from "./HomePage.module.css";

const STACK = ["sst v3", "lambda", "api gateway", "dynamodb", "cognito", "react", "expo", "typescript", "python", "rust"];

export function HomePage() {
  return (
    <>
      <Hero />
      <p className={styles.hint}>
        <span className={styles.keys}># tab to a project, enter to open its README</span>
        <span className={styles.touch}># tap a project to open its README</span>
      </p>
      <Block id="products" cmd="ls -l ./products">
        <ProjectList projects={catalog.byTier("featured")} />
      </Block>
      <Block id="tools" cmd="./tools --list">
        <ProjectList projects={catalog.byTier("tooling")} />
      </Block>
      <Block id="clients" cmd="ls ./clients">
        <ProjectList projects={catalog.byTier("client")} />
      </Block>
      <Block id="stack" cmd="cat stack.txt">
        <p className={styles.stack}>
          {STACK.map((s, i) => (
            <span key={s}>{i > 0 && <i aria-hidden="true"> / </i>}{s}</span>
          ))}
        </p>
      </Block>
      <Prompt />
    </>
  );
}
