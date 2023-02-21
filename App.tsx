import { useReducer } from 'react';
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
import Navigation from './navigation';

import { reducer } from './contexts/reducer';
import { UserContext, initialState as userInitialState } from './contexts/UserContext';
import { PetContext, initialState as petInitialState } from './contexts/PetContext';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [userState, userDispatch] = useReducer(reducer, userInitialState);
  const [petState, petDispatch] = useReducer(reducer, petInitialState);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <SafeAreaProvider>
            <UserContext.Provider value={[userState, userDispatch]}>
              <PetContext.Provider value={[petState, petDispatch]}>
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
