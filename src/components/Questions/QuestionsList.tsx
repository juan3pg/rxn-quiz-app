import React, { useContext } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { QuestionResult } from '../../interfaces/QuestionInterface';
import { QuestionItem } from './QuestionItem';
import { Button } from '../../ui/Button';
import { useNavigation } from '@react-navigation/native';
import { QuizContext } from '../../store/quiz/QuizContext';

interface QuestionsListProps {
  questions: QuestionResult[];
}

export const QuestionsList = ({ questions }: QuestionsListProps) => {
  const navigation = useNavigation<any>();

  const quizCtx = useContext(QuizContext)

  function showResultsHandler() {
    const questionsAnswered = quizCtx.quiz.questions.filter((question) => question.selected_answer);
    if (questionsAnswered.length !== quizCtx.quiz.questions.length) {
      Alert.alert(
        'Can not continue!',
        'Please respond all questions in this quiz to see your results.'
      );
      return
    }
    navigation.navigate('ResultsScreen')
  }

  return (
    <View style={ styles.container }>
      <FlatList
        data={ questions }
        renderItem={ ({ item }: any) => (
          <QuestionItem question = { item } />
        )}
        keyExtractor={(item, index) => item.question + index}
        ListHeaderComponent={() => (
          <Text style={ styles.text }>Select the correct answer for every question and continue to show the results.</Text>
        )}
        ListFooterComponent={() => (
          <View style={styles.button}>
            <Button onPress={ showResultsHandler }>
              Show results
            </Button>
          </View>
        )}
        showsVerticalScrollIndicator={ false }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 12,
    marginBottom: 32,
  },
});
