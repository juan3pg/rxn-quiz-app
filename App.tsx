import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { Colors } from './src/constants/styles';
import { LoginScreen } from './src/screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContextProvider, { AuthContext } from './src/store/auth/AuthContext';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import IconButton from './src/ui/IconButton';
import { QuestionsScreen } from './src/screens/QuestionsScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { QuizContextProvider } from './src/store/quiz/QuizContext';
import * as SplashScreen from 'expo-splash-screen';

export type RootStackParams = {
  LoginScreen: undefined,
  WelcomeScreen: undefined,
  ResultsScreen: undefined,
  QuestionsScreen: undefined,
}

const Stack = createNativeStackNavigator<RootStackParams>();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          title: 'Welcome',
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <Stack.Screen name="QuestionsScreen" component={QuestionsScreen} options={{ title: 'Questions' }} />
      <Stack.Screen name="ResultsScreen" component={ResultsScreen} options={{ title: 'Results' }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  SplashScreen.preventAutoHideAsync();
  const [appIsReady, setAppIsReady] = useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        authCtx.login(storedToken);
      }
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }

    fetchToken();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <QuizContextProvider>
          <Root />
        </QuizContextProvider>
      </AuthContextProvider>
    </>
  );
}