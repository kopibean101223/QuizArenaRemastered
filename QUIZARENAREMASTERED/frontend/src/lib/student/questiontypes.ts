// export type QuestionType =
// //   | 'mcq'
// //   | 'multiple_select'
// //   | 'true_false'
// //   | 'short_answer'
// //   | 'fill_in_blank'
// //   | 'matching'
// //   | 'ordering'
// //   | 'essay'
// //   | 'code'
//   | 'True / False'
//   | 'Mathematics'
//   | 'Short Answer'
//   | 'Multiple Choice'
//   | 'Numerical Input'
//   | 'Multiple Choice'
//   | 'Identification';
 
// export interface BaseQuestion {
//   id: string | number;
//   difficulty: string;
//   topic: string;
//   subject: string;
//   text: string;
//   points: number;
//   timeLimit: number; // in seconds
//   explanation?: string;
//   mediaUrl?: string;
// }
 
// // // Single correct choice out of several options
// // export interface MCQQuestion extends BaseQuestion {
// //   type: 'mcq';
// //   options: string[];
// //   correct: number; // single index
// // }
 
// // // Multiple correct choices out of several options
// // export interface MultipleSelectQuestion extends BaseQuestion {
// //   type: 'multiple_select';
// //   options: string[];
// //   correct: number[]; // array of correct indices
// // }
 
// // // Binary choice
// // export interface TrueFalseQuestion extends BaseQuestion {
// //   type: 'true_false';
// //   correct: boolean;
// // }
 
// // // Free-text, matched against accepted strings
// // export interface ShortAnswerQuestion extends BaseQuestion {
// //   type: 'short_answer';
// //   acceptedAnswers: string[];
// //   caseSensitive: boolean;
// // }
 
// // // One or more blanks inside `text` (e.g. "The capital of France is {{0}}.")
// // export interface FillInBlankQuestion extends BaseQuestion {
// //   type: 'fill_in_blank';
// //   blanks: {
// //     acceptedAnswers: string[];
// //     caseSensitive: boolean;
// //   }[];
// // }
 
// // // Pair up left/right items
// // export interface MatchingQuestion extends BaseQuestion {
// //   type: 'matching';
// //   pairs: { left: string; right: string }[];
// // }

  
// export interface MCQQuestion extends BaseQuestion {
//   type: 'mcq';
//   options: string[];
//   correct: number; // single index
// }
 
// // Multiple correct choices out of several options
// export interface MultipleSelectQuestion extends BaseQuestion {
//   type: 'multiple_select';
//   options: string[];
//   correct: number[]; // array of correct indices
// }
 
// // Binary choice
// export interface TrueFalseQuestion extends BaseQuestion {
//   type: 'true_false';
//   correct: boolean;
// }
 
// // Free-text, matched against accepted strings
// export interface ShortAnswerQuestion extends BaseQuestion {
//   type: 'short_answer';
//   acceptedAnswers: string[];
//   caseSensitive: boolean;
// }
 
// // One or more blanks inside `text` (e.g. "The capital of France is {{0}}.")
// export interface FillInBlankQuestion extends BaseQuestion {
//   type: 'fill_in_blank';
//   blanks: {
//     acceptedAnswers: string[];
//     caseSensitive: boolean;
//   }[];
// }
 
// // Pair up left/right items
// export interface MatchingQuestion extends BaseQuestion {
//   type: 'matching';
//   pairs: { left: string; right: string }[];
// }
 
// // Arrange items into the correct sequence — this is your "step by step" type
// export interface OrderingQuestion extends BaseQuestion {
//   type: 'ordering';
//   steps: string[]; // shown to the student in shuffled order
//   correctOrder: number[]; // indices into `steps`, in correct sequence
// }
// // Arrange items into the correct sequence — this is your "step by step" type
// export interface OrderingQuestion extends BaseQuestion {
//   type: 'ordering';
//   steps: string[]; // shown to the student in shuffled order
//   correctOrder: number[]; // indices into `steps`, in correct sequence
// }
 
// // Long-form free response, not auto-graded
// export interface EssayQuestion extends BaseQuestion {
//   type: 'essay';
//   minWords?: number;
//   maxWords?: number;
//   rubric?: string;
// }
 
// // Code submission, optionally auto-graded against test cases
// export interface CodeQuestion extends BaseQuestion {
//   type: 'code';
//   language: string;
//   starterCode?: string;
//   testCases?: { input: string; expectedOutput: string }[];
// }
 
// export type NormalizedQuestion =
//   | MCQQuestion
//   | MultipleSelectQuestion
//   | TrueFalseQuestion
//   | ShortAnswerQuestion
//   | FillInBlankQuestion
//   | MatchingQuestion
//   | OrderingQuestion
//   | EssayQuestion
//   | CodeQuestion;



export type QuestionType =
  | 'True / False'
  | 'Mathematics'
  | 'Short Answer'
  | 'Multiple Choice'
  | 'Numerical Input'
  | 'Identification';

export interface BaseQuestion {
  id: string | number;
  difficulty: string;
 //remove if nageeroror hanngang bloom level
 estimated_difficulty?: number;
  bloomLevel?: string;
  topic: string;
  subject: string;
  text: string;
  points: number;
  timeLimit: number; // in seconds
  explanation?: string;
  mediaUrl?: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'True / False';
  correct: boolean;
}

export interface MathematicsQuestion extends BaseQuestion {
  type: 'Mathematics';
  correctExpression: string; // e.g. "2x + 4" or "x = 3"
  allowEquivalentForms?: boolean; // e.g. "1/2" === "0.5"
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: 'Short Answer';
  acceptedAnswers: string[];
  caseSensitive: boolean;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'Multiple Choice';
  options: string[];
  correct: number; // single index
}

export interface NumericalInputQuestion extends BaseQuestion {
  type: 'Numerical Input';
  correctValue: number;
  tolerance?: number; // +/- range considered correct
  unit?: string; // e.g. "kg", "m/s"
}

export interface IdentificationQuestion extends BaseQuestion {
  type: 'Identification';
  acceptedAnswers: string[];
  caseSensitive: boolean;
}

export type NormalizedQuestion =
  | TrueFalseQuestion
  | MathematicsQuestion
  | ShortAnswerQuestion
  | MultipleChoiceQuestion
  | NumericalInputQuestion
  | IdentificationQuestion;