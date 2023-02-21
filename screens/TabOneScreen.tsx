import { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';

import { RootTabScreenProps } from '../types';
import { UserContext } from '../contexts/UserContext';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (state == null) {
      dispatch({ type: 'GET_USER_INFO' });
    }
  }, []);
  return (
    <Layout style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text>{JSON.stringify(state)}</Text>
      <Layout style={styles.separator} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
