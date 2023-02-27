import { useState } from 'react';
import { Layout, Text, ViewPager } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { CacheImage } from '../components/CacheImage';

type Props = {};

export default function HomeScreen({}: Props) {
  const insets = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Layout>
      <ViewPager
        style={{ paddingTop: insets.top }}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <Layout level="2" style={{ height: '100%' }}>
          <Text>Page1</Text>
        </Layout>
        <Layout level="2" style={{ height: '100%' }}>
          <Text>Page2</Text>
        </Layout>
      </ViewPager>
      <StatusBar style={'auto'} />
    </Layout>
  );
}
