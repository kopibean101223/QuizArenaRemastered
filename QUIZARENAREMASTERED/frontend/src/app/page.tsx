"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppProvider, useApp } from "@/context/AppContext";
import { AuthScreen } from "@/components/AuthScreen";
import { BattleLobby } from "@/components/studentONLY/BattleLobby";
import { SelfPacedBattle } from "@/components/studentONLY/Battle_OwnPace";
// Ensure this import matches the exported component name in Battle_LiveQuiz.tsx
import { LiveBattle } from "@/components/studentONLY/Battle_LiveQuiz"; 
import { BattleResults } from "@/components/studentONLY/BattleResults";
import { ProfessorDashboard } from "@/components/profonly/ProfessorDashboard";
import SectionsDashboard from "@/components/profonly/SectionsDashboard";
import { QuestionBank } from "@/components/profonly/QuestionBank";
import { AIQuestionGenerator } from "@/components/profonly/AIQuestionGenerator";
import Matchmaking from "@/components/Matchmaking";
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
  // Grab current active section/battle ID from AppContext or query params
  const { page, setPage, user, isLoading, activeSectionId } = useApp();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Fallback to URL search param if AppContext section ID isn't set
  const battleId = activeSectionId || searchParams.get("battleId") || "";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isLoading) return;
    const urlPage = searchParams.get("page");
    if (urlPage && urlPage !== page && setPage) {
      setPage(urlPage as any);
    }
  }, [searchParams, isMounted, isLoading]);

  useEffect(() => {
    if (!isMounted || !page || isLoading) return;
    const currentParam = searchParams.get("page");
    if (currentParam !== page) {
      router.replace(`/?page=${page}`, { scroll: false });
    }
  }, [page, isLoading, isMounted, searchParams, router]);

  useEffect(() => {
    if (isMounted && !isLoading && user && page === "login") {
      const targetRoute = user.role === "professor" ? "dashboard" : "lobby";
      setPage(targetRoute);
    }
  }, [isMounted, isLoading, user, page, setPage]);

  if (!isMounted || isLoading) {
    return <LoadingSpinner />;
  }

  // Router Switch
  switch (page) {
    case "lobby":
      return <BattleLobby />;
    case "battle_selfpaced":
      return <SelfPacedBattle battleId={battleId} />;
    case "battle_livequiz":
      // Pass the required battleId prop here
      return <LiveBattle battleId={battleId} />;
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