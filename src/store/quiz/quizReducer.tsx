import { QuestionResult } from '../../interfaces/QuestionInterface';
import { Quiz } from './QuizContext';

type QuizAction = 
  | { type: 'save', payload: QuestionResult[] } 
  | { type: 'clear' } 
  | { type: 'respondQuestion', payload: QuestionResult };

export const quizReducer = ( state: Quiz, action: QuizAction ): Quiz => {
  switch ( action.type ) {
    case 'save':
      return {
        ...state,
        questions: action.payload,
      }

    case 'clear':
      return {
        ...state,
        questions: []
      }

    case 'respondQuestion':
      const questionIndex = state.questions.findIndex(
        (question) => question.question === action.payload.question
      );
      const updatableQuestion = state.questions[questionIndex];
      const updatedItem = { ...updatableQuestion, ...action.payload };
      const updatedQuestions = [...state.questions];
      updatedQuestions[questionIndex] = updatedItem;
      return {
        ...state,
        questions: updatedQuestions
      }

    default:
      return state;
  }
}