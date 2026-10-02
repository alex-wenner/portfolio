import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Prompt } from "../components/Terminal";

export function NotFoundPage() {
  const { pathname } = useLocation();

  // CloudFront serves the SPA shell with a 200 for unknown paths, so keep them out of search indexes.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <section aria-labelledby="nf">
      <Prompt cmd={`cd ${pathname}`} />
      <h1 id="nf" style={{ fontFamily: "var(--font-type)", fontWeight: 400 }}>No such file or directory</h1>
      <Link to="/">$ cd ~</Link>
    </section>
  );
}
