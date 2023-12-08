export interface OpenTriviaQuizResponse {
  results: QuestionResult[];
}

export interface QuestionResult {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  selected_answer: string;
  shuffled_answers: string[];
}