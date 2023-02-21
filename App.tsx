import { useReducer, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Icon } from '@ui-kitten/components';
import { default as theme } from './theme/custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { IconRegistry } from '@ui-kitten/components';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { useAsyncReducer } from './hooks/useAsyncReducer';
// TODO 可以做弹通知回到app刷新app信息
// import { useAppState } from './hooks/useAppState';
import Navigation from './navigation';

import { reducer } from './contexts/reducer';
import { UserContext, initialState as userInitialState } from './contexts/UserContext';
import { PetContext, initialState as petInitialState } from './contexts/PetContext';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // useAppState();

  const [userState, userDispatch] = useAsyncReducer(reducer, userInitialState);
  const [petState, petDispatch] = useAsyncReducer(reducer, petInitialState);

  const userValue = useMemo(() => [userState, userDispatch], [userState]);
  const petValue = useMemo(() => [petState, petDispatch], [petState]);

  console.log('userState is ' + JSON.stringify(userValue));

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <SafeAreaProvider>
            <UserContext.Provider value={userValue}>
              <PetContext.Provider value={petValue}>
                <Navigation colorScheme={colorScheme} />
              </PetContext.Provider>
            </UserContext.Provider>
            <StatusBar />
          </SafeAreaProvider>
        </ApplicationProvider>
      </RootSiblingParent>
    );
  }
}
