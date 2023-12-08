import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '../constants/styles';
import { Button } from '../ui/Button';
import { useNavigation } from '@react-navigation/native';

export const WelcomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={ styles.container }>
      <View style={ styles.form }>
        <Text style= { styles.text }>Welcome!</Text>
        <Button onPress={()=> navigation.navigate('QuestionsScreen')}>
          Start the quiz
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 32
  },
  form: {
    width: '100%',
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 25,
    marginBottom: 16,
    textAlign:'center',
  }
});