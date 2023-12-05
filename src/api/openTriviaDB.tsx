import axios from 'axios';
import { OpenTriviaQuizResponse, QuestionResult } from '../interfaces/QuestionInterface';

export async function fetchQuestions() {
  const url = 'https://opentdb.com/api.php?amount=10&difficulty=hard';

  const response = await axios.get<OpenTriviaQuizResponse>(url);

  let questions: QuestionResult[] = [];

  questions = response.data.results;

  return questions;
}
