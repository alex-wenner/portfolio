import "@testing-library/jest-dom/vitest";

// jsdom has no matchMedia; default to reduced motion so text renders immediately in tests.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("reduce"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
});
