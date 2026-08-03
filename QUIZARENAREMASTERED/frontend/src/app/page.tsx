"use client";

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

// NOTE: This app manages its own "pages" via AppContext (page state), the
// same way it did in the original Vite/SPA version. That behavior is kept
// as-is here for a simple thesis demo. If you want real Next.js routing
// later (e.g. /lobby, /dashboard as actual URLs), each case below can be
// moved into its own src/app/<route>/page.tsx file.
function Router() {
  const { page } = useApp();

  switch (page) {
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

    // Auth
    case "login":
    default:
      return <AuthScreen />;
  }
}

export default function Home() {
  return (
    <AppProvider>
      <div className="size-full overflow-auto">
        <Router />
      </div>
    </AppProvider>
  );
}
