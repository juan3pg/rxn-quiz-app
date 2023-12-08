import React, { useContext } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { QuizContext } from '../store/quiz/QuizContext'
import { useNavigation } from '@react-navigation/native';
import { QuestionItem } from '../components/Questions/QuestionItem';
import { Button } from '../ui/Button';

export const ResultsScreen = () => {
  const navigation = useNavigation<any>();

  const quizCtx = useContext(QuizContext)

  const score = quizCtx.quiz.questions.filter(
    (question) => question.selected_answer === question.correct_answer
  );

  function playAgainHandler() {
    quizCtx.clear();
    navigation.popToTop();
  }

  function scoreLayout() {
    return (
      <View style={ styles.scoreLayout }>
        <Text style={ styles.text }>Score</Text>
        <Text style={ styles.text }>{ score.length * 100 } / { quizCtx.quiz.questions.length * 100 }</Text>
      </View>
    )
  }

  return (
    <View style={ styles.container }>
      <FlatList
        data={ quizCtx.quiz.questions }
        renderItem={ ({ item }: any) => (
          <QuestionItem question = { item } showResultsOnly={ true } />
        )}
        keyExtractor={(item, index) => item.question + index}
        ListHeaderComponent={() => (
          scoreLayout()
        )}
        ListFooterComponent={() => (
          <View style={styles.button}>
            <Button onPress={ playAgainHandler }>
              Play again
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
    fontSize: 32,
  },
  button: {
    marginTop: 12,
    marginBottom: 32,
  },
  scoreLayout: {
    alignItems: 'center'
  }
});
