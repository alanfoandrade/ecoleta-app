import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingModal from '../components/LoadingModal';

import { useAuth } from '../hooks/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingModal loading={loading} />;
  }

  return user ? (
    <Stack.Navigator>
      <Stack.Screen
        name="AppRoutes"
        component={AppRoutes}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthRoutes"
        component={AuthRoutes}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
