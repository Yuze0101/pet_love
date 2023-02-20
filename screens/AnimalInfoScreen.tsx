import { Input, Button, Layout, Text } from '@ui-kitten/components';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { pxToDp } from '../constants/Layout';
type Props = {};

export default function AnimalInfoScreen({}: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: 'red',
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: pxToDp(24),
        paddingRight: pxToDp(24),
      }}
    >
      <Text>AnimalInfoScreen</Text>
      <StatusBar style={'auto'} />
    </View>
  );
}
