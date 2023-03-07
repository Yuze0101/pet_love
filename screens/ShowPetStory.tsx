import { useEffect, useState } from 'react';
import { Layout, List, Text, useTheme, Divider, Avatar, ButtonGroup, Button, Icon } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { CustomTopNavigation } from '../components/CustomTopNavigation';
import { pxToDp } from '../constants/Layout';
import { UserCenterScreenProps } from '../types';
import { CreativeCard } from '../components/CreativeCard';
import { CreativeCardProps } from '../types';
import { queryCardByPage } from '../api';
import { CacheImage } from '../components/CacheImage';

const CardHeader = (props: CreativeCardProps) => {
  const theme = useTheme();
  const date = new Date(props.createDate);
  return (
    <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Layout style={{ paddingLeft: pxToDp(5), flexDirection: 'row', alignItems: 'flex-end' }}>
        <Text category="h6">{date.getDate()}</Text>
        <Text category="c1" style={{ marginLeft: pxToDp(5) }}>
          {date.getMonth() + 1}月
        </Text>
      </Layout>
      <ButtonGroup size="small" appearance="ghost" style={{ margin: 2 }}>
        <Button style={{ flexDirection: 'column' }} accessoryLeft={<Icon name="lock" />}></Button>
        <Button style={{ flexDirection: 'column' }} accessoryLeft={<Icon name="message-circle-outline" />}>
          {props.commentCount}
        </Button>
        <Button
          style={{ flexDirection: 'column' }}
          accessoryLeft={<Icon fill={theme['color-danger-500']} name="heart" />}
        >
          {props.likesCount}
        </Button>
      </ButtonGroup>
    </Layout>
  );
};

export const ShowPetStory = ({ navigation, route }: UserCenterScreenProps<'ShowPetStory'>) => {
  const insets = useSafeAreaInsets();
  const [petStoryList, setPetStoryList] = useState([]);
  const userQueryCardByPage = async () => {
    try {
      const res: any = await queryCardByPage({
        petId: 38,
        pageNum: 1,
        pageSize: 3,
      });
      console.log('userQueryCardByPage Result ' + JSON.stringify(res));
      if (res.success) {
        console.log('userQueryCardByPage data ' + JSON.stringify(res.data));
        setPetStoryList(res.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    userQueryCardByPage();
  }, []);

  const renderItem = (props: CreativeCardProps) => (
    <Layout style={{ padding: pxToDp(8) }}>
      <CreativeCard content={props.content} header={() => CardHeader(props)} imageList={props.picList} />
    </Layout>
  );
  return (
    <Layout
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <CustomTopNavigation
        title="12"
        showLeftBack={true}
        leftAction={() => {
          navigation.goBack();
        }}
      ></CustomTopNavigation>
      <Layout
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'red',
        }}
      >
        <List
          data={petStoryList}
          // TODO 修正传递参数
          renderItem={props => renderItem(props.item)}
          style={{ borderWidth: 1, borderColor: 'red' }}
        ></List>
      </Layout>
      <StatusBar style="auto" />
    </Layout>
  );
};
