import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import Routes from './routes';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F0F0F5' }}>
        <Routes />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
