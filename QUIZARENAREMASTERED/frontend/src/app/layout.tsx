import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

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
      <body className="size-full">{children}
<Toaster position="top-right" richColors />

      </body>
    </html>
  );
}
