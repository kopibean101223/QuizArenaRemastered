"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { createBrowserClient } from "@supabase/ssr";

export type Role = "student" | "professor";

export type Page =
  | "login" | "role"
  | "lobby" | "battle" | "results"
  | "battle_livequiz" | "battle_team" | "battle_royale" | "battle_selfpaced"
  | "dashboard" | "sections" | "questions" | "aigen" | "matchmaking" | "analyzer";

// The four concrete battle-mode pages, kept in one place so nothing drifts out of sync
export type BattleMode = "LIVE" | "TEAM" | "ROYALE" | "SELF_PACED";

const STUDENT_PAGES: Page[] = [
  "lobby", "battle", "results",
  "battle_livequiz", "battle_team", "battle_royale", "battle_selfpaced",
];
const PROFESSOR_PAGES: Page[] = ["dashboard", "sections", "questions", "aigen", "matchmaking", "analyzer"];

export interface AppUser {
  id: string;
  email: string;
  name: string;
  role: Role | null;
}

interface AppContextValue {
  user: AppUser | null;
  page: Page;
  setPage: (page: Page) => void;
  logout: () => Promise<void>;
  navigate: (page: Page) => void;
  isLoading: boolean;
  // FIX (1.6): activeSectionId was read by page.tsx but never existed here.
  activeSectionId: string;
  setActiveSectionId: (id: string) => void;
  // FIX (1.5): so page.tsx knows which results screen to render.
  lastBattleMode: BattleMode;
  setLastBattleMode: (mode: BattleMode) => void;
}

const AppContext = createContext<AppContextValue>({
  user: null,
  page: "login",
  setPage: () => {},
  logout: async () => {},
  navigate: () => {},
  isLoading: true,
  activeSectionId: "",
  setActiveSectionId: () => {},
  lastBattleMode: "LIVE",
  setLastBattleMode: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [page, setPageInternal] = useState<Page>("login");
  const [isLoading, setIsLoading] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState("");
  const [lastBattleMode, setLastBattleMode] = useState<BattleMode>("LIVE");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Helper to safely set page with strict RBAC rules
  const setPage = (target: Page) => {
    if (!user) {
      if (target !== "login" && target !== "role") {
        setPageInternal("login");
      } else {
        setPageInternal(target);
      }
      return;
    }

    if (user.role === "professor" && STUDENT_PAGES.includes(target)) {
      setPageInternal("dashboard");
      return;
    }
    if (user.role === "student" && PROFESSOR_PAGES.includes(target)) {
      setPageInternal("lobby");
      return;
    }

    setPageInternal(target);
  };

  useEffect(() => {
  async function syncSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        let role = session.user.user_metadata?.role as Role | undefined;

        if (!role) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("user_id", session.user.id)
            .maybeSingle();

          role = profile?.role;
        }

        const appUser: AppUser = {
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User",
          role: role || null,
        };

        setUser(appUser);

        // Get URL parameter or pick role-based default route
        const urlParams = new URLSearchParams(window.location.search);
        const urlPage = urlParams.get("page") as Page | null;

        const defaultPage = appUser.role === "professor" ? "dashboard" : "lobby";

        // FIX: If URL has no page parameter OR is set to 'login', redirect to role default
        if (!urlPage || urlPage === "login") {
          setPageInternal(appUser.role ? defaultPage : "role");
        } else {
          // Validate requested URL against user role
          if (appUser.role === "professor" && STUDENT_PAGES.includes(urlPage)) {
            setPageInternal("dashboard");
          } else if (appUser.role === "student" && PROFESSOR_PAGES.includes(urlPage)) {
            setPageInternal("lobby");
          } else {
            setPageInternal(urlPage);
          }
        }
      } else {
        setUser(null);
        setPageInternal("login");
      }
    } catch (err) {
      console.error("Error fetching session in AppContext:", err);
    } finally {
      setIsLoading(false);
    }
  }

  syncSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        let role = session.user.user_metadata?.role as Role | undefined;

        if (!role) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("user_id", session.user.id)
            .maybeSingle();

          role = profile?.role;
        }

        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User",
          role: role || null,
        });
      } else {
        setUser(null);
        setPageInternal("login");
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setPageInternal("login");
    window.location.href = "/?page=login";
  }

  function navigate(target: Page) {
    setPage(target);
  }

  return (
    <AppContext.Provider value={{
      user, page, setPage, logout, navigate, isLoading,
      activeSectionId, setActiveSectionId,
      lastBattleMode, setLastBattleMode,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
