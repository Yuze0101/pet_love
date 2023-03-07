import { useState, useCallback, useEffect } from 'react';
import { RefreshControl, Image } from 'react-native';
import {
  Layout,
  Text,
  ViewPager,
  TabBar,
  Tab,
  Divider,
  List,
  Card,
  Avatar,
  Button,
  ButtonGroup,
  Icon,
  useTheme,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { CacheImage } from '../components/CacheImage';
import { pxToDp } from '../constants/Layout';
import { queryCardByPage } from '../api';

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

type ListItem = {
  id: number;
  petId: number;
  createDate: Date;
  modifyDate: Date;
  picList: string[];
  content: string;
  likesCount: number;
  commentCount: number;
  hotValue: number;
  tipOffCount: number;
  status: 'PUBLIC' | 'PRIVATE';
  type: 'CAT' | 'DOG' | 'OTHER';
  extInfo: string;
};

type ListData = ListItem[];

const RenderTitle = (props: RenderTitleProps) => (
  <Text status={props.isActive ? 'primary' : 'basic'} category="h4">
    {props.title}
  </Text>
);

const CardFooter = () => {
  const theme = useTheme();
  return (
    <Layout style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar size="large" source={require('../assets/images/icon.png')}></Avatar>
        <Layout style={{ paddingLeft: pxToDp(5) }}>
          <Text category="">owner name</Text>
        </Layout>
      </Layout>
      <ButtonGroup appearance="ghost" style={{ margin: 2 }}>
        <Button style={{ flexDirection: 'column' }} accessoryLeft={<Icon name="message-circle-outline" />}>
          999+
        </Button>
        <Button
          style={{ flexDirection: 'column' }}
          accessoryLeft={<Icon fill={theme['color-danger-500']} name="heart" />}
        >
          999+
        </Button>
      </ButtonGroup>
    </Layout>
  );
};

const CardHeader = () => (
  <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Avatar size="large" source={require('../assets/images/icon.png')}></Avatar>
    <Layout style={{ paddingLeft: pxToDp(5) }}>
      <Text category="s1">Header</Text>
      <Text category="c2" appearance="hint">
        Header
      </Text>
    </Layout>
  </Layout>
);

const CreativeCard = (props: CreativeCardProps) => (
  <Card appearance="filled" header={CardHeader} footer={CardFooter}>
    <Image source={require('../assets/images/locked.png')}></Image>
    <Text category="p1" numberOfLines={3}>
      contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
    </Text>
  </Card>
);

export default function HomeScreen({}: Props) {
  const insets = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [listData, setListData] = useState([]);

  const userQueryCardByPage = async () => {
    const res = await queryCardByPage({
      petId: 1,
      pageNum: 1,
      pageSize: 3,
    });
    console.log('userQueryCardByPage Result : ' + JSON.stringify(res));
  };
  useEffect(() => {
    // TODO 请求列表
    // userQueryCardByPage();
  }, []);

  // const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = (item: CreativeCardProps) => (
    <Layout style={{ padding: pxToDp(8) }}>
      <CreativeCard />
    </Layout>
  );
  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
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
              data={[4, 5, 6]}
              // TODO 修正传递参数
              renderItem={props => renderItem(props.item)}
              // style={{ paddingLeft: pxToDp(8), paddingRight: pxToDp(8) }}
            ></List>
          </Layout>
          <Layout level="2" style={{ height: '100%' }}>
            {/* <List
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              data={[1, 2]}
              renderItem={() => renderItem()}
            ></List> */}
          </Layout>
        </ViewPager>
      </Layout>
      <StatusBar style={'auto'} />
    </Layout>
  );
}
