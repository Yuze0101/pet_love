import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserCenterParamList } from '../types';
import UserCenterScreen from '../screens/UserCenterScreen';
import PetInfoScreen from '../screens/PetInfoScreen';
import SettingScreen from '../screens/SettingScreen';
import EditUserScreen from '../screens/EditUserScreen';
import AddPetStory from '../screens/AddPetStory';
import { ShowPetStory } from '../screens/ShowPetStory';

const Stack = createNativeStackNavigator<UserCenterParamList>();
type Props = {};

export default function UserCenterNavigator({}: Props) {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={UserCenterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PetInfo" component={PetInfoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditUser" component={EditUserScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddPetStory" component={AddPetStory} options={{ headerShown: false }} />
      <Stack.Screen name="ShowPetStory" component={ShowPetStory} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
