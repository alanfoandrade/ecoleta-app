import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#bbb" />
      <AppProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#bbb' }}>
          <Routes />
        </SafeAreaView>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
