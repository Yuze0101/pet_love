import React from 'react';
import { workAround } from '../utils/workArround';
import { Icon, Text, TopNavigation, TopNavigationAction, IconProps, Avatar, Layout } from '@ui-kitten/components';

const BackIcon = (props: IconProps) => <Icon {...workAround(props)} name="arrow-back" />;

type CustomTopNavigationProps = {
  title: string;
  subTitle?: string;
  action: Function;
};

export const CustomTopNavigation = (props: CustomTopNavigationProps) => {
  return (
    <TopNavigation
      accessoryLeft={<TopNavigationAction icon={BackIcon} onPress={() => props.action()} />}
      accessoryRight={<Text>右侧按钮</Text>}
      alignment={'center'}
      // title={evaProps => <Text {...evaProps}>{props.title}</Text>}
      title={() => (
        <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Avatar source={require('../assets/images/icon.png')} /> */}
          <Text>{props.title}</Text>
        </Layout>
      )}
      subtitle={evaProps => (props.subTitle ? <Text {...evaProps}>{props.subTitle}</Text> : <></>)}
    />
  );
};
