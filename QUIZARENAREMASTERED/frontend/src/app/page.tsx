"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppProvider, useApp } from "@/context/AppContext";
import { AuthScreen } from "@/components/AuthScreen";
import { BattleLobby } from "@/components/studentONLY/BattleLobby";
import { SelfPacedBattle} from "@/components/studentONLY/LiveBattle_OwnPace";
import { BattleResults } from "@/components/studentONLY/BattleResults";
import { ProfessorDashboard } from "@/components/profonly/ProfessorDashboard";
import { SectionsDashboard } from "@/components/profonly/SectionsDashboard";
import { QuestionBank } from "@/components/profonly/QuestionBank";
import { AIQuestionGenerator } from "@/components/profonly/AIQuestionGenerator";
import { Matchmaking } from "@/components/Matchmaking";
import { SolutionAnalyzer } from "@/components/profonly/SolutionAnalyzer";
import ChooseRole from "@/components/chooserole";

function LoadingSpinner() {
  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center gap-3">
      <div className="size-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs text-slate-400 font-mono">Loading...</p>
    </div>
  );
}

function RouterContent() {
  const { page, setPage, user, isLoading } = useApp();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // 1. Mark component as client-mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Sync URL search param into AppContext on parameter change
  useEffect(() => {
    if (!isMounted || isLoading) return;
    const urlPage = searchParams.get("page");
    if (urlPage && urlPage !== page && setPage) {
      setPage(urlPage as any);
    }
  }, [searchParams, isMounted, isLoading]);

  // 3. Keep URL parameter updated whenever AppContext 'page' state changes
  useEffect(() => {
    if (!isMounted || !page || isLoading) return;
    const currentParam = searchParams.get("page");
    if (currentParam !== page) {
      router.replace(`/?page=${page}`, { scroll: false });
    }
  }, [page, isLoading, isMounted, searchParams, router]);

  // 4. FIX FOR BUG 2: Side-effect moved inside useEffect (never run navigation during render pass)
  useEffect(() => {
    if (isMounted && !isLoading && user && page === "login") {
      const targetRoute = user.role === "professor" ? "dashboard" : "lobby";
      setPage(targetRoute);
    }
  }, [isMounted, isLoading, user, page, setPage]);

  // 5. Hydration Protection: Block UI rendering until client mount completes
  if (!isMounted || isLoading) {
    return <LoadingSpinner />;
  }

  // 6. Router Switch
  switch (page) {
    case "lobby":
      return <BattleLobby />;
    case "battle":
      return <LiveBattle />;
    case "results":
      return <BattleResults />;
    case "dashboard":
      return <ProfessorDashboard />;
    case "sections":
      return <SectionsDashboard />;
    case "questions":
      return <QuestionBank />;
    case "aigen":
      return <AIQuestionGenerator />;
    case "matchmaking":
      return <Matchmaking />;
    case "analyzer":
      return <SolutionAnalyzer />;
    case "role":
      return <ChooseRole />;
    case "login":
    default:
      if (user) {
        return user.role === "professor" ? <ProfessorDashboard /> : <BattleLobby />;
      }
      return <AuthScreen />;
  }
}

export default function Home() {
  return (
    <AppProvider>
      <div className="size-full overflow-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <RouterContent />
        </Suspense>
      </div>
    </AppProvider>
  );
}