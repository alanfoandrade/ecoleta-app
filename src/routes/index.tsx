import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AppRoutes from './app.routes';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AppRoutes"
      component={AppRoutes}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default Routes;
