import { useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { Layout, Text, ViewPager, TabBar, Tab, Divider, List, ListItem, Card, Avatar } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { CacheImage } from '../components/CacheImage';
import { pxToDp } from '../constants/Layout';

type Props = {};

type RenderTitleProps = {
  isActive: boolean;
  title: string;
};

type CreativeCardProps = {
  avatarUrl?: string;
  userName: string;
  imageUrl?: string;
  releaseTime: Date;
  contentText: string;
};
const RenderTitle = (props: RenderTitleProps) => (
  <Text status={props.isActive ? 'primary' : 'basic'} category="h3">
    {props.title}
  </Text>
);

const CardFooter = () => (
  <Layout>
    <Text>footer</Text>
  </Layout>
);

const CardHeader = () => (
  <Layout>
    <Text>Header</Text>
  </Layout>
);

const CreativeCard = (props: CreativeCardProps) => (
  <Card style={{ width: '100%', padding: 0 }} header={CardHeader} footer={CardFooter}>
    <Text>content</Text>
  </Card>
);

export default function HomeScreen({}: Props) {
  const insets = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = () => (
    <ListItem>
      <CreativeCard />
    </ListItem>
  );
  return (
    <Layout>
      <Layout style={{ paddingTop: insets.top }}>
        <TabBar
          style={{ paddingLeft: pxToDp(110), paddingRight: pxToDp(110) }}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
          indicatorStyle={{ display: 'none' }}
        >
          <Tab title={() => RenderTitle({ isActive: selectedIndex == 0, title: '热门' })} />
          <Tab title={() => RenderTitle({ isActive: selectedIndex == 1, title: '最新' })} />
        </TabBar>
        <Divider></Divider>
        <ViewPager selectedIndex={selectedIndex} onSelect={index => setSelectedIndex(index)}>
          <Layout level="2" style={{ height: '100%' }}>
            <List
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              data={[1, 2]}
              renderItem={renderItem}
            ></List>
          </Layout>
          <Layout level="2" style={{ height: '100%' }}>
            <List
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              data={[1, 2]}
              renderItem={renderItem}
            ></List>
          </Layout>
        </ViewPager>
      </Layout>
      <StatusBar style={'auto'} />
    </Layout>
  );
}
