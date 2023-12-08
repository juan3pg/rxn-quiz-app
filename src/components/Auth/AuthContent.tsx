import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { AuthForm, CredentialsInvalidProps } from './AuthForm';
import { Colors } from '../../constants/styles';

interface LoginFormFields {
  userName: string;
  password: string;
}

interface AuthContentProps {
  onAuthenticate: () => void;
}

export const AuthContent = ({ onAuthenticate }: AuthContentProps) => {

  const [credentialsInvalid, setCredentialsInvalid] = useState<CredentialsInvalidProps>({
    userName: false,
    password: false
  });

  function submitHandler({ userName, password } : LoginFormFields) {
    userName = userName.trim();
    password = password.trim();

    const userNameIsValid = userName === 'adminUser';
    const passwordIsValid = password === '12345678';

    if (!userNameIsValid || !passwordIsValid) {
      Alert.alert('Invalid credentials', 'Please check your entered username and password.');
      setCredentialsInvalid({ userName: !userNameIsValid, password: !passwordIsValid });
      return;
    }
    onAuthenticate();
  }

  return (
    <View style={ styles.authContent }>
      <AuthForm
        onSubmit={ submitHandler }
        credentialsInvalid={credentialsInvalid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
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
  buttons: {
    marginTop: 8,
  },
});
