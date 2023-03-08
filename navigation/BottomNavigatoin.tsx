import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import HomeIcon from '../components/HomeIcon';
import ShapeIcon from '../components/ShapeIcon';
import PetBellIcon from '../components/PetBellIcon';

export const BottomNavigatoin = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={() => <HomeIcon isActive={state.index == 0} />} />
    <BottomNavigationTab icon={() => <PetBellIcon isActive={state.index == 1} />} />
    <BottomNavigationTab icon={() => <ShapeIcon isActive={state.index == 2} />} />
  </BottomNavigation>
);
