"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppProvider, useApp } from "@/context/AppContext";
import { AuthScreen } from "@/components/AuthScreen";
import { BattleLobby } from "@/components/BattleLobby";
import { LiveBattle } from "@/components/LiveBattle";
import { BattleResults } from "@/components/BattleResults";
import { ProfessorDashboard } from "@/components/ProfessorDashboard";
import { SectionsDashboard } from "@/components/SectionsDashboard";
import { QuestionBank } from "@/components/QuestionBank";
import { AIQuestionGenerator } from "@/components/AIQuestionGenerator";
import { Matchmaking } from "@/components/Matchmaking";
import { SolutionAnalyzer } from "@/components/SolutionAnalyzer";
import ChooseRole from "@/components/chooserole"; 

function RouterContent() {
  const { page, setPage } = useApp();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);

  // 1. Mark component as mounted to safely render client-only state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Sync URL query parameter to AppContext
  useEffect(() => {
    const targetPage = searchParams.get("page");
    if (targetPage && setPage && targetPage !== page) {
      setPage(targetPage);
    }
  }, [searchParams, setPage, page]);

  // 3. Prevent Hydration Mismatch: Render a loading shell during SSR frame
  if (!isMounted) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center">
        <div className="size-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 4. Derive target active page (Prioritize URL param first)
  const targetPage = searchParams.get("page");
  const activePage = targetPage || page;

  switch (activePage) {
    // Student flow
    case "lobby":
      return <BattleLobby />;
    case "battle":
      return <LiveBattle />;
    case "results":
      return <BattleResults />;

    // Professor flow
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