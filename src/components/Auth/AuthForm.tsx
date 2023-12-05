import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../ui/Button';
import Input from './Input';

export interface CredentialsInvalidProps {
  userName: boolean;
  password: boolean;
}

interface AuthFormProps {
  onSubmit: any;
  credentialsInvalid: CredentialsInvalidProps;
}

function AuthForm( { onSubmit, credentialsInvalid }: AuthFormProps ) {
  const [enteredUserName, setEnteredUserName] = useState('adminUser');
  const [enteredPassword, setEnteredPassword] = useState('12345678');

  const {
    userName: userNameIsInvalid,
    password: passwordIsInvalid,
  } = credentialsInvalid;

  function submitHandler() {
    onSubmit({
      userName: enteredUserName,
      password: enteredPassword
    });
  }

  return (
    <View>
      <View>
        <Input
          label="User name"
          onChangeText={(text) => setEnteredUserName( text )}
          value={enteredUserName}
          keyboardType="default"
          isInvalid={userNameIsInvalid}
        />
        <Input
          label="Password"
          onChangeText={(text) => setEnteredPassword( text )}
          secureTextEntry={true}
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            Log In
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
