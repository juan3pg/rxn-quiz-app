import React from 'react'
import { FlatList, Text, StyleSheet, View } from 'react-native'
import { QuestionResult } from '../../interfaces/QuestionInterface'
import { AnswerItem } from './AnswerItem';
import { decode } from 'html-entities';
import { Colors } from '../../constants/styles';

interface QuestionItemProps {
  question: QuestionResult;
  showResultsOnly?: boolean
}

export const QuestionItem = ({ question, showResultsOnly }: QuestionItemProps) => {

  let answers: string[] = [];  
  if (showResultsOnly) {
    answers.push(question.selected_answer);
  } else {
    answers = question.shuffled_answers;
  }

  return (
    <View style={ styles.card }>
      <Text style={ styles.text }>{ decode(question.question) }</Text>
      <FlatList
        data={ answers }
        renderItem={ ({ item }: any) => (
          <AnswerItem question={ question } answer={ item } />
        )}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary800,
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    fontSize: 20,
    marginBottom: 16,
    color: 'white'
  }
});