"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppProvider, useApp } from "@/context/AppContext";
import { AuthScreen } from "@/components/AuthScreen";
import { BattleLobby } from "@/components/studentONLY/BattleLobby";
import { LiveBattle } from "@/components/studentONLY/LiveBattle";
import { BattleResults } from "@/components/studentONLY/BattleResults";
import { ProfessorDashboard } from "@/components/profonly/ProfessorDashboard";
import { SectionsDashboard } from "@/components/profonly/SectionsDashboard";
import { QuestionBank } from "@/components/profonly/QuestionBank";
import { AIQuestionGenerator } from "@/components/profonly/AIQuestionGenerator";
import { Matchmaking } from "@/components/Matchmaking";
import { SolutionAnalyzer } from "@/components/profonly/SolutionAnalyzer";
import ChooseRole from "@/components/chooserole"; 

function RouterContent() {
  const { page, setPage } = useApp();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // 1. Mark component as mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Initial Sync: On page load, read URL param into AppContext state once
  useEffect(() => {
    const targetPage = searchParams.get("page");
    if (targetPage && setPage) {
      setPage(targetPage);
    }
  }, []); // Run only once on mount

  // 3. Keep URL parameter updated whenever AppContext 'page' state changes
  useEffect(() => {
    if (!page) return;
    const currentParam = searchParams.get("page");
    if (currentParam !== page) {
      router.push(`/?page=${page}`, { scroll: false });
    }
  }, [page, searchParams, router]);

  // 4. Hydration Protection
  if (!isMounted) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center">
        <div className="size-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 5. Render directly based on AppContext state
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
      return <AuthScreen />;
  }
}

export default function Home() {
  return (
    <AppProvider>
      <div className="size-full overflow-auto">
        <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
          <RouterContent />
        </Suspense>
      </div>
    </AppProvider>
  );
}