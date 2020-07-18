import React, { useCallback } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import {
  createStackNavigator,
  StackHeaderLeftButtonProps,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';

import Dashboard from '../pages/App/Dashboard';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const { signOut } = useAuth();

  const navigation = useNavigation();

  const handleLogout = useCallback(() => {
    Alert.alert(
      `Deseja realmente sair?`,
      'Será necessário fazer login novamente.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Confirmar', onPress: () => signOut() },
      ],
      { cancelable: true },
    );
  }, [signOut]);

  return (
    <App.Navigator
      screenOptions={{
        headerTintColor: '#444',
        headerStyle: {
          backgroundColor: '#999',
          elevation: 0,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'Roboto-Medium',
        },
        headerLeftContainerStyle: {
          marginLeft: 16,
        },
        headerRightContainerStyle: {
          marginRight: 16,
        },
        cardStyle: {
          backgroundColor: '#bbb',
        },
      }}
    >
      <App.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'React Native Project',
          headerLeft: ({ tintColor }: StackHeaderLeftButtonProps) => (
            <TouchableOpacity onPress={handleLogout}>
              <Icon name="power" size={25} color={tintColor} />
            </TouchableOpacity>
          ),
          headerRight: ({ tintColor }: StackHeaderLeftButtonProps) => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Icon name="settings" size={25} color={tintColor} />
            </TouchableOpacity>
          ),
        }}
      />
    </App.Navigator>
  );
};
export default AppRoutes;
