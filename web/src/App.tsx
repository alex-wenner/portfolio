import { Route, Routes } from "react-router-dom";
import { TerminalWindow } from "./components/Terminal";
import { StatusBar } from "./components/StatusBar";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

const STAGE = import.meta.env.VITE_STAGE ?? "local";

export function App() {
  return (
    <TerminalWindow title="alex@wenner: ~/portfolio — zsh" footer={<StatusBar stage={STAGE} />}>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </TerminalWindow>
  );
}
