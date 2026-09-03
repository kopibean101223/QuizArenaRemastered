import { useEffect, useState } from "react";
import { AnswerBtn } from "../LiveBattleCOMPONENTONLY/AnswerButton";
import { C } from "../LiveBattleCOMPONENTONLY/Constants";
import {
  parseNumericValue,
  type NormalizedQuestion,
} from "@/lib/student/battle/useBattleConnection";

interface AnswerInputProps {
  question: NormalizedQuestion;
  disabled: boolean;
  revealed: boolean;
  onSubmit: (value: any) => void;
}

const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "Manrope, sans-serif",
  fontSize: 16,
  fontWeight: 600,
  color: "#fff",
  background: "rgba(255,255,255,0.05)",
  border: "2px solid rgba(255,255,255,0.1)",
  borderRadius: 16,
  padding: "16px 18px",
  outline: "none",
};

export function AnswerInput({ question, disabled, revealed, onSubmit }: AnswerInputProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [boolChoice, setBoolChoice] = useState<boolean | null>(null);
  const [text, setText] = useState("");
  const [num, setNum] = useState("");
  const [stepValues, setStepValues] = useState<string[]>([]);

  switch (question.type) {
    // 4-choice grid — unchanged from today, just routed through here now.
    case "Multiple Choice":
      return (
        <>
          {question.options.map((opt, i) => (
            <AnswerBtn
              key={i}
              index={i}
              text={opt}
              selected={selectedIndex === i}
              revealed={revealed}
              isCorrect={i === question.correct}
              disabled={disabled}
              onClick={() => {
                setSelectedIndex(i);
                onSubmit(i);
              }}
            />
          ))}
        </>
      );

    // Two large buttons instead of four — no A/B/C/D badges needed.
    case "True / False":
      return (
        <div style={{ display: "flex", gap: 14 }}>
          {[true, false].map((val) => {
            const isSelected = boolChoice === val;
            const isCorrectAnswer = revealed && val === question.correct;
            const isWrongPick = revealed && isSelected && val !== question.correct;
            return (
              <button
                key={String(val)}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setBoolChoice(val);
                  onSubmit(val);
                }}
                style={{
                  flex: 1,
                  padding: "22px 0",
                  borderRadius: 20,
                  fontFamily: "Fredoka, sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  cursor: disabled ? "default" : "pointer",
                  color: "#fff",
                  background: isCorrectAnswer
                    ? "rgba(46,212,122,0.15)"
                    : isWrongPick
                    ? "rgba(255,71,87,0.12)"
                    : isSelected
                    ? "rgba(91,61,246,0.18)"
                    : "rgba(255,255,255,0.05)",
                  border: `2px solid ${
                    isCorrectAnswer ? C.green : isWrongPick ? C.red : isSelected ? C.indigo : "rgba(255,255,255,0.1)"
                  }`,
                }}
              >
                {val ? "True" : "False"}
              </button>
            );
          })}
        </div>
      );

    // Free-text — same input shape for both, only the box size differs.
    case "Identification":
      return (
        <input
          type="text"
          value={text}
          disabled={disabled}
          placeholder="Type your answer..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit(text)}
          style={inputBaseStyle}
        />
      );

    case "Short Answer":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <textarea
            value={text}
            disabled={disabled}
            placeholder="Type your answer..."
            onChange={(e) => setText(e.target.value)}
            rows={3}
            style={{ ...inputBaseStyle, resize: "none" }}
          />
          <button
            type="button"
            disabled={disabled || !text.trim()}
            onClick={() => onSubmit(text)}
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "none",
              borderRadius: 12,
              background: disabled || !text.trim() ? "rgba(255,255,255,0.1)" : C.indigo,
              color: "#fff",
              fontFamily: "Manrope, sans-serif",
              fontWeight: 800,
              cursor: disabled || !text.trim() ? "default" : "pointer",
              opacity: disabled || !text.trim() ? 0.5 : 1,
            }}
          >
            Submit Answer
          </button>
        </div>
      );

    case "Step-by-step Solution": {
      const stepQuestion = question as typeof question & {
        stepWeights?: Array<{ stepDescription?: string; description?: string; pointsAwarded?: number; commonMistake?: string }>;
        steps?: string[];
      };

      const stepEntries = Array.isArray(stepQuestion.stepWeights) && stepQuestion.stepWeights.length > 0
        ? stepQuestion.stepWeights.map((step, index) => step?.stepDescription ?? step?.description ?? `Step ${index + 1}`)
        : Array.isArray(stepQuestion.steps) && stepQuestion.steps.length > 0
          ? stepQuestion.steps
          : ["Step 1"];

      useEffect(() => {
        setStepValues((prev) => {
          const next = stepEntries.map((_, index) => prev[index] ?? "");
          if (next.length === prev.length && next.every((value, index) => value === (prev[index] ?? ""))) {
            return prev;
          }
          return next;
        });
      }, [stepEntries.length]);

      const combinedValue = stepValues.join("\n\n");

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {stepEntries.map((label, index) => (
            <div key={`${label}-${index}`} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {label}
              </label>
              <textarea
                value={stepValues[index] ?? ""}
                disabled={disabled}
                placeholder={`Type your answer for ${label.toLowerCase()}...`}
                onChange={(e) => {
                  const next = [...stepValues];
                  next[index] = e.target.value;
                  setStepValues(next);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSubmit(combinedValue);
                  }
                }}
                rows={3}
                style={{ ...inputBaseStyle, resize: "vertical" }}
              />
            </div>
          ))}
        </div>
      );
    }

    // Numeric keypad-friendly input, unit shown as a suffix if the question has one.
    case "Numerical Input":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="text"
            inputMode="decimal"
            value={num}
            disabled={disabled}
            placeholder="0"
            onChange={(e) => setNum(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              const parsed = parseNumericValue(num);
              onSubmit(parsed ?? num);
            }}
            style={inputBaseStyle}
          />
          {question.unit && (
            <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>
              {question.unit}
            </span>
          )}
        </div>
      );

    // Same text input as Identification for now — swap for a math-symbol
    // keyboard / KaTeX preview later if you want live rendering.
    case "Mathematics":
      return (
        <input
          type="text"
          value={text}
          disabled={disabled}
          placeholder="e.g. 2x + 4"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit(text)}
          style={{ ...inputBaseStyle, fontFamily: "monospace" }}
        />
      );

    default:
      return null;
  }
}