import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "student" | "professor";

export type Page =
  // auth
  | "login"
  // student
  | "lobby" | "battle" | "results"
  // professor
  | "dashboard" | "sections" | "questions" | "aigen" | "matchmaking" | "analyzer";

export interface AppUser {
  email: string;
  name: string;
  role: Role;
}

// ── Hardcoded test accounts ───────────────────────────────────────────────────
const ACCOUNTS: { email: string; password: string; name: string; role: Role; home: Page }[] = [
  { email: "am@umak.edu.ph",   password: "Gingging1331", name: "Alex M.",       role: "student",   home: "lobby"     },
  { email: "emer@umak.edu.ph", password: "Gingging1221", name: "Prof. Reyes",   role: "professor", home: "dashboard" },
];

interface AppContextValue {
  user: AppUser | null;
  page: Page;
  login:    (email: string, password: string) => "ok" | "bad_credentials";
  logout:   () => void;
  navigate: (page: Page) => void;
}

const AppContext = createContext<AppContextValue>({
  user: null,
  page: "login",
  login:    () => "bad_credentials",
  logout:   () => {},
  navigate: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser]   = useState<AppUser | null>(null);
  const [page, setPage]   = useState<Page>("login");

  function login(email: string, password: string): "ok" | "bad_credentials" {
    const account = ACCOUNTS.find(
      a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (!account) return "bad_credentials";
    setUser({ email: account.email, name: account.name, role: account.role });
    setPage(account.home);
    return "ok";
  }

  function logout() {
    setUser(null);
    setPage("login");
  }

  function navigate(target: Page) {
    // Guard: students can't access professor pages and vice versa
    if (!user) { setPage("login"); return; }
    const studentPages: Page[] = ["lobby", "battle", "results"];
    const professorPages: Page[] = ["dashboard", "sections", "questions", "aigen", "matchmaking", "analyzer"];
    if (user.role === "student" && professorPages.includes(target)) return;
    if (user.role === "professor" && studentPages.includes(target)) return;
    setPage(target);
  }

  return (
    <AppContext.Provider value={{ user, page, login, logout, navigate }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
