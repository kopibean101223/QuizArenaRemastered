"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AppProvider, useApp } from "@/context/AppContext";
import { AuthScreen } from "@/components/AuthScreen";
import { StudentDashboard } from "@/components/studentONLY/StudentDashboard";
import { StudentHistory } from "@/components/studentONLY/StudentHistory";
import { StudentClasses } from "@/components/studentONLY/StudentClasses";
import { StudentProfile } from "@/components/studentONLY/StudentProfile";
import { BattleResults } from "@/components/studentONLY/BattleResultsONLY/Results_LiveQuiz";
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
  const { page, setPage, user, isLoading } = useApp();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const battleId = searchParams.get("battleId") || "";

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
      const url = battleId ? `/?page=${page}&battleId=${battleId}` : `/?page=${page}`;
      router.replace(url, { scroll: false });
    }
  }, [page, battleId, isLoading, isMounted, searchParams, router]);

  useEffect(() => {
    if (isMounted && !isLoading && user && page === "login") {
      const targetRoute = !user.role ? "role" : user.role === "professor" ? "dashboard" : "student_dashboard";
      setPage(targetRoute);
    }
  }, [isMounted, isLoading, user, page, setPage]);

  if (!isMounted || isLoading) {
    return <LoadingSpinner />;
  }

  // Router Switch
  switch (page) {
    case "student_dashboard":
      return <StudentDashboard />;
    case "history":
      return <StudentHistory />;
    case "classes":
      return <StudentClasses />;
    case "profile":
      return <StudentProfile />;
    case "results":
      return <BattleResults battleId={battleId} />;
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
        if (!user.role) return <ChooseRole />;
        return user.role === "professor" ? <ProfessorDashboard /> : <StudentDashboard />;
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