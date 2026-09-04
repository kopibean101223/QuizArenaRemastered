CREATE TABLE IF NOT EXISTS public."QuestionChoice" (
    id SERIAL PRIMARY KEY,
    "questionId" INTEGER NOT NULL REFERENCES public."GeneratedQuestion"(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    text TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS public."QuestionCitation" (
    id SERIAL PRIMARY KEY,
    "questionId" INTEGER NOT NULL UNIQUE REFERENCES public."GeneratedQuestion"(id) ON DELETE CASCADE,
    "docName" TEXT NOT NULL,
    section TEXT
);
