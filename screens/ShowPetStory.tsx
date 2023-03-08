import { useEffect, useState, useContext } from 'react';
import { Layout, List, Text, useTheme, Divider, Avatar, ButtonGroup, Button, Icon } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { CustomTopNavigation } from '../components/CustomTopNavigation';
import { pxToDp } from '../constants/Layout';
import { UserCenterScreenProps } from '../types';
import { CreativeCard } from '../components/CreativeCard';
import { CreativeCardProps, Pet } from '../types';
import { queryCardByPage } from '../api';
import { CacheImage } from '../components/CacheImage';
import { PetContext } from '../contexts/PetContext';

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
// TODO 增加上滑刷新
export const ShowPetStory = ({ navigation, route }: UserCenterScreenProps<'ShowPetStory'>) => {
  const insets = useSafeAreaInsets();
  const [petState, _dispatch] = useContext(PetContext);
  const [petStoryList, setPetStoryList] = useState([]);
  const [petInfo, setPetInfo] = useState({} as Pet);
  const userQueryCardByPage = (() => {
    let pageNum = 1;
    const nextPage = (value: number) => {
      pageNum += value;
    };
    return async () => {
      try {
        const res: any = await queryCardByPage({
          petId: route.params.id,
          pageNum,
          pageSize: 5,
        });
        console.log(`userQueryCardByPage, pageNum: ${pageNum}  Result ` + JSON.stringify(res));
        if (res.success) {
          setPetStoryList(res.data);
          nextPage(1);
        }
      } catch (error) {}
    };
  })();
  const userSetPetInfo = () => {
    petState.forEach((item: Pet) => {
      if (item.id == route.params.id) setPetInfo(item);
    });
  };
  useEffect(() => {
    userSetPetInfo();
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
        title={petInfo.name}
        avatar={petInfo.portraitUrl}
        showLeftBack={true}
        leftAction={() => {
          navigation.goBack();
        }}
      ></CustomTopNavigation>
      <Layout
        style={{
          flex: 1,
        }}
      >
        <List data={petStoryList} renderItem={props => renderItem(props.item)}></List>
      </Layout>
      <StatusBar style="auto" />
    </Layout>
  );
};
