import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserCenterParamList } from '../types';
import UserCenterScreen from '../screens/UserCenterScreen';
import PetInfoScreen from '../screens/PetInfoScreen';

const Stack = createNativeStackNavigator<UserCenterParamList>();
type Props = {};

export default function UserCenterNavigator({}: Props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={UserCenterScreen} />
      <Stack.Screen name="PetInfo" component={PetInfoScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
