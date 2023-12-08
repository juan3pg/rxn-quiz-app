import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

export interface AuthContextProps {
  token?: string;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
} as AuthContextProps);

export const AuthContextProvider = ({ children } : any) =>{
  const [authToken, setAuthToken] = useState<string | undefined>();

  function login(token: string) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken(undefined);
    AsyncStorage.removeItem('token');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    login: login,
    logout: logout,
  };

  return <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>;
}