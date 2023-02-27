/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as React from 'react';

import Colors from '../constants/Colors';
import WelcomeScreen from '../screens/WelcomeScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserCenterNavigator from './UserCenterNavigator';
// import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import { BottomNavigatoin } from './BottomNavigatoin';
import { useUpdateUserAndPetInfo } from '../hooks/useUpdateUserAndPetInfo';

const { themeColor } = Colors;

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'card', headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '登陆' }} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={({ route }) => {
            //@ts-ignore
            return { title: route?.params?.status == 'regist' ? '注册' : '找回密码' };
          }}
        />
      </Stack.Group>
      <Stack.Screen name="Modal" options={{ presentation: 'modal' }} component={ModalScreen} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  // const insets = useSafeAreaInsets();
  useUpdateUserAndPetInfo();
  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      tabBar={props => BottomNavigatoin({ ...props })}
      screenOptions={{
        tabBarActiveTintColor: themeColor.orange,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'HomeScreen'>) => ({
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="UserCenter"
        component={UserCenterNavigator}
        options={{
          headerShown: false,
          title: 'Tab Four',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
