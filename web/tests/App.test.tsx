import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "../src/App";

function renderAt(path = "/") {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
}

describe("App", () => {
  it("shows the name once for screen readers and no corny tagline", () => {
    renderAt();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Alex Wenner.");
    expect(screen.queryByText(/ship whole products/i)).toBeNull();
  });

  it("renders the command sections", () => {
    renderAt();
    expect(screen.getByRole("heading", { name: /ls -l \.\/products/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /\.\/tools --list/ })).toBeInTheDocument();
  });

  it("expands a project with the keyboard (Tab + Enter) and collapses with Space", async () => {
    const user = userEvent.setup();
    renderAt();
    const row = screen.getByRole("button", { name: /nightscene\// });
    expect(row).toHaveAttribute("aria-expanded", "false");

    // Tab until the NightScene row has focus.
    for (let i = 0; i < 20 && document.activeElement !== row; i++) await user.tab();
    expect(row).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(row).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("list", { name: "NightScene tech stack" })).toBeInTheDocument();

    await user.keyboard(" ");
    expect(row).toHaveAttribute("aria-expanded", "false");
  });

  it("lets several projects stay open at once", async () => {
    const user = userEvent.setup();
    renderAt();
    const a = screen.getByRole("button", { name: /nightscene\// });
    const b = screen.getByRole("button", { name: /promptlens\// });
    await user.click(a);
    await user.click(b);
    expect(a).toHaveAttribute("aria-expanded", "true");
    expect(b).toHaveAttribute("aria-expanded", "true");
  });

  it("closes a panel with Escape and returns focus to its row", async () => {
    const user = userEvent.setup();
    renderAt();
    const row = screen.getByRole("button", { name: /promptlens\// });
    await user.click(row);
    screen.getByRole("link", { name: /git clone/ }).focus();
    await user.keyboard("{Escape}");
    expect(row).toHaveAttribute("aria-expanded", "false");
    expect(row).toHaveFocus();
  });

  it("closes an open row with Escape when focus is on the row", async () => {
    const user = userEvent.setup();
    renderAt();
    const row = screen.getByRole("button", { name: /nightscene\// });
    await user.click(row);
    expect(row).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(row).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the Wenntech write-up from the founder line", async () => {
    const user = userEvent.setup();
    renderAt();
    const founder = screen.getByRole("button", { name: /founder · wenntech/ });
    await user.click(founder);
    expect(screen.getByRole("region", { name: "Wenntech README" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(founder).toHaveAttribute("aria-expanded", "false");
  });

  it("lists Works by Sam Ø under clients, not products", () => {
    renderAt();
    const clients = screen.getByRole("region", { name: /ls \.\/clients/ });
    expect(clients).toHaveTextContent("works-by-sam-o/");
    const products = screen.getByRole("region", { name: /ls -l \.\/products/ });
    expect(products).not.toHaveTextContent("works-by-sam-o/");
  });

  it("links code only for public projects", async () => {
    const user = userEvent.setup();
    renderAt();
    await user.click(screen.getByRole("button", { name: /promptlens\// }));
    expect(screen.getByRole("link", { name: /git clone github.com\/alex-wenner\/prompt-lens/ })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /fitgoai\// }));
    expect(screen.getByText("# source is private")).toBeInTheDocument();
  });

  it("shows not found for unknown paths", () => {
    renderAt("/nope");
    expect(screen.getByRole("heading", { name: "No such file or directory" })).toBeInTheDocument();
  });
});
