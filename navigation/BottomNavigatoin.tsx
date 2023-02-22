import React from 'react';
import { BottomNavigation, BottomNavigationTab,Icon } from '@ui-kitten/components';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

// TODO 底部Bar增加Icon
export const BottomNavigatoin = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Tab1" />
    <BottomNavigationTab title="Tab2" />
    <BottomNavigationTab title="Tab3" />
    <BottomNavigationTab title="Tab4" />
  </BottomNavigation>
);
