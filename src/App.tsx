// src/app/App.tsx
import React from 'react'
import { AppProvider, useApp } from './../QUIZARENAREMASTERED/frontend/src/context/AppContext'
// import { StudentTopBar } from './components/shared/StudentTopBar'
// import { ProfSidebar } from './components/shared/ProfSidebar'
// import { AuthScreen } from './components/AuthScreen'
// import { ProfessorDashboard } from './components/ProfessorDashboard'
// import { SectionsDashboard } from './components/SectionsDashboard'

const AppContent: React.FC = () => {
  //const { user } = useApp()

  // if (!user) {
  //   return <AuthScreen />
  // }

  // return (
  //   <div className="flex min-h-screen flex-col bg-background text-foreground">
  //     <StudentTopBar />
  //     <div className="flex flex-1">
  //       {user.role === 'professor' ? (
  //         <>
  //           <ProfSidebar />
  //           <ProfessorDashboard />
  //         </>
  //       ) : (
  //         <main className="flex-1">
  //           <SectionsDashboard />
  //         </main>
  //       )}
  //     </div>
  //   </div>
  // )
}

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App