export type ExerciseDifficulty = 'easy' | 'medium' | 'hard';

export type BaseExercise = {
  id: string;
  title: string;
  description?: string;
  difficulty: ExerciseDifficulty;
};

export type SpotTheIssueElement = {
  id: string;
  type: 'heading' | 'subheading' | 'text' | 'button' | 'label';
  content: string;
  styles?: Record<string, string>;
  isIssue: boolean;
  issueExplanation?: string;
};

export type SpotTheIssueExercise = BaseExercise & {
  type: 'spot-the-issue';
  issueCount: number;
  layout: { elements: SpotTheIssueElement[] };
};

export type MultipleChoiceOption = {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
};

export type MultipleChoiceExercise = BaseExercise & {
  type: 'multiple-choice';
  question: string;
  options: MultipleChoiceOption[];
};

export type FixTheCodeExercise = BaseExercise & {
  type: 'fix-the-code';
  language: 'html' | 'css' | 'javascript' | 'typescript';
  starterCode: string;
  solution: string;
  hints: string[];
};

export type SelfAssessmentCategory = {
  name: string;
  skills: string[];
  maxScore: number;
};

export type SelfAssessmentExercise = BaseExercise & {
  type: 'self-assessment';
  categories: SelfAssessmentCategory[];
};

export type Exercise = SpotTheIssueExercise | MultipleChoiceExercise | FixTheCodeExercise | SelfAssessmentExercise;

export function parseExerciseData(jsonString: string): Exercise {
  return JSON.parse(jsonString);
}
