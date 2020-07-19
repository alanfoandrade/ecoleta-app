import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Points from '../pages/Points';
import Details from '../pages/Details';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: '#f0f0f5',
        },
      }}
    >
      <App.Screen name="Home" component={Home} />

      <App.Screen name="Points" component={Points} />

      <App.Screen name="Details" component={Details} />
    </App.Navigator>
  );
};
export default AppRoutes;
