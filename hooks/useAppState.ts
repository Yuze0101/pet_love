import { useRef, useEffect } from 'react';
import { AppState } from 'react-native';

export const useAppState = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState == 'active') {
        console.log('App has come to the foreground!');
      }
      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });
  }, []);
};
