import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuizArena (Demo)",
  description:
    "Engages students with lively game-show style quizzes while providing professors with intuitive dashboards to manage content and analyze performance.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="size-full">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
