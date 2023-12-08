import React, { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { fetchQuestions } from '../api/openTriviaDB';
import { ErrorOverlay } from '../ui/ErrorOverlay';
import { LoadingOverlay } from '../ui/LoadingOverlay';
import { QuestionsList } from '../components/Questions/QuestionsList';
import { QuestionResult } from '../interfaces/QuestionInterface';
import { QuizContext } from '../store/quiz/QuizContext';

export const QuestionsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [questions, setQuestions] = useState<QuestionResult[]>([]);
  const questionsCtx = useContext(QuizContext);

  useEffect(() => {
    async function getQuestions() {
      setIsLoading(true);
      try {
        const response = await fetchQuestions();
        setQuestions(response);
        questionsCtx.save(response);
      } catch (error) {
        setError('Could not fetch questions!');
      }
      setIsLoading(false);
    }

    getQuestions();
  }, []);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} />;
  }

  if (isLoading) {
    return <LoadingOverlay message='Loading questions' />;
  }

  return (
    <View>
      <QuestionsList questions={ questions } />
    </View>
  )
}
