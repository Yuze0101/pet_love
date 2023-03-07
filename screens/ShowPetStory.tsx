import { useEffect, useState } from 'react';
import { Layout, List, Text, useTheme, Divider, Avatar, ButtonGroup, Button, Icon } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { CustomTopNavigation } from '../components/CustomTopNavigation';
import { pxToDp } from '../constants/Layout';
import { UserCenterScreenProps } from '../types';
import { CreativeCard } from '../components/CreativeCard';
import { CreativeCardProps } from '../types';

const CardHeader = () => {
  const theme = useTheme();
  return (
    <Layout style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Layout style={{ paddingLeft: pxToDp(5), flexDirection: 'row', alignItems: 'center' }}>
        <Text category="h6">日期</Text>
        <Text category="c1" style={{ marginLeft: pxToDp(5) }}>
          月份
        </Text>
      </Layout>
      <ButtonGroup size="small" appearance="ghost" style={{ margin: 2 }}>
        <Button style={{ flexDirection: 'column' }} accessoryLeft={<Icon name="lock" />}></Button>
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

export const ShowPetStory = ({ navigation, route }: UserCenterScreenProps<'ShowPetStory'>) => {
  const insets = useSafeAreaInsets();
  useEffect(() => {}, []);

  const renderItem = (item: CreativeCardProps) => (
    <Layout style={{ padding: pxToDp(8) }}>
      <CreativeCard content="123123123" header={CardHeader} imageList={[]} />
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
          data={[4, 5, 6]}
          // TODO 修正传递参数
          renderItem={props => renderItem()}
          style={{ borderWidth: 1, borderColor: 'red' }}
        ></List>
      </Layout>
      <StatusBar style="auto" />
    </Layout>
  );
};
