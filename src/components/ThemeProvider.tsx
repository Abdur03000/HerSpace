"use client";
import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => {},
});

// The blocking script in layout.tsx owns the truth: it writes data-theme on
// <html> before first paint. Reading it through useSyncExternalStore keeps the
// component honest about that without seeding state during render (which
// desynced dark-mode visitors) or syncing in an effect (which the hooks lint
// rules reject).
const THEME_EVENT = "herspace-theme";

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

// Hydration replays the server's HTML, so it has to be told what the server
// rendered. The blocking script has already corrected the attribute by then,
// which is why the page still paints in the right colours.
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("herspace-theme", next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
