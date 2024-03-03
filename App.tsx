import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { RootStackParamList } from './src/@types';
import MoviesScreen from './src/screens/MoviesScreen/MoviesScreen';
import MovieScreen from 'screens/MovieScreen/MovieScreen';
import Splash from 'screens/Splash';

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  const onLoading = () => setIsLoading(false);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {isLoading ? (
          <Splash onLoading={onLoading} />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Movies" component={MoviesScreen} />
            <Stack.Screen name="Movie" component={MovieScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </QueryClientProvider>
  );
}
