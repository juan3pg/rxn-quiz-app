import { createContext, useReducer } from 'react';
import { QuestionResult } from '../../interfaces/QuestionInterface';
import { quizReducer } from './quizReducer';

export interface Quiz {
  questions: QuestionResult[];
}

export const quizInitialState: Quiz = {
  questions: []
}

export interface QuizContextProps {
  quiz: Quiz;
  save: (questions: QuestionResult[]) => void;
  clear: () => void;
  respondQuestion: (question: QuestionResult, answer: string) => void;
}

export const QuizContext = createContext( {} as QuizContextProps );

export const QuizContextProvider = ({ children }: any ) => {
  const [quiz, dispatch] = useReducer( quizReducer, quizInitialState );
  const save = (questions: QuestionResult[]) => {
      dispatch({ type: 'save', payload: questions });
  }
  const clear = () => {
      dispatch({ type: 'clear' });
  }
  const respondQuestion = ( question: QuestionResult, answer: string ) => {
    question.selected_answer = answer;
    dispatch({ type: 'respondQuestion', payload: question })
  }

  return (
    <QuizContext.Provider value={{
      quiz,
      save,
      clear,
      respondQuestion
    }}>
      { children }
    </QuizContext.Provider>
  )
}