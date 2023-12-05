import React, { useContext, useState } from 'react'
import { AuthContext } from '../store/auth/AuthContext';
import AuthContent from '../components/Auth/AuthContent';
import { Alert } from 'react-native';
import LoadingOverlay from '../ui/LoadingOverlay';

export const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler(email: string, password: string) {
    setIsAuthenticating(true);
    try {
      const token = 'authToken';
      authCtx.login(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent onAuthenticate={loginHandler} />;
}
