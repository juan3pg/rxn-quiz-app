import React, { useContext, useState } from 'react'
import { Text, StyleSheet, View, Pressable } from 'react-native'
import { Colors } from '../../constants/styles';
import { Ionicons } from '@expo/vector-icons';
import { decode } from 'html-entities';
import { QuizContext } from '../../store/quiz/QuizContext';
import { QuestionResult } from '../../interfaces/QuestionInterface';

interface AnswerItemProps {
  question: QuestionResult;
  answer: string;
}

export const AnswerItem = ({ question, answer }: AnswerItemProps) => {
  const [isResponded, setisResponded] = useState(!!question.selected_answer)
  const isCorrect: boolean = answer === question.correct_answer;
  const icon: any = isCorrect ? 'checkmark-outline' : 'close';
  const color: string = isCorrect ? 'green' : 'red';

  const quizCtx = useContext(QuizContext);

  function respondHandler() {
    setisResponded(true);
    quizCtx.respondQuestion(question, answer);
  }

  return (
    <Pressable
      onPress={respondHandler}
      style={({ pressed }) => pressed && styles.pressed}
      disabled={ !!question.selected_answer }
    >
      <View style={ styles.container }>
        <Text style={ styles.text }>{ decode(answer) }</Text>
        {
          isResponded && <Ionicons name={ icon } color={ color } size={ 20 } />
        }
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary100,
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    fontSize: 14,
  },
  pressed: {
    opacity: 0.75,
  },
})