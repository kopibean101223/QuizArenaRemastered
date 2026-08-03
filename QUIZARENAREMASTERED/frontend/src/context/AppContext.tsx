"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { createBrowserClient } from "@supabase/ssr";

export type Role = "student" | "professor";

export type Page =
  // auth
  | "login" | "role"
  // student
  | "lobby" | "battle" | "results"
  // professor
  | "dashboard" | "sections" | "questions" | "aigen" | "matchmaking" | "analyzer";

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
}

const AppContext = createContext<AppContextValue>({
  user: null,
  page: "login",
  setPage: () => {},
  logout: async () => {},
  navigate: () => {},
  isLoading: true,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [page, setPage] = useState<Page>("login");
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Supabase Browser Client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 1. Fetch current session & active role from Supabase on mount
  useEffect(() => {
    async function syncSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          // Resolve role from metadata or profiles table
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
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("❌ Error fetching session in AppContext:", err);
      } finally {
        setIsLoading(false);
      }
    }

    syncSession();

    // Listen for realtime auth state changes (login, logout, token refresh)
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
        setPage("login");
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Perform Supabase Logout
  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    setPage("login");
    window.location.href = "/?page=login";
  }

  // 3. Navigation Guard
  function navigate(target: Page) {
    if (!user) {
      setPage("login");
      return;
    }

    const studentPages: Page[] = ["lobby", "battle", "results"];
    const professorPages: Page[] = ["dashboard", "sections", "questions", "aigen", "matchmaking", "analyzer"];

    if (user.role === "student" && professorPages.includes(target)) return;
    if (user.role === "professor" && studentPages.includes(target)) return;

    setPage(target);
  }

  return (
    <AppContext.Provider value={{ user, page, setPage, logout, navigate, isLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}