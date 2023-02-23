import React from 'react';
import { workAround } from '../utils/workArround';
import { Icon, Text, TopNavigation, TopNavigationAction, IconProps, Avatar, Layout } from '@ui-kitten/components';
import { pxToDp } from '../constants/Layout';

const BackIcon = (props: IconProps) => <Icon {...workAround(props)} name="arrow-back" />;
const SettingsIcon = (props: IconProps) => <Icon {...workAround(props)} name="settings-outline" />;

type CustomTopNavigationProps = {
  title: string;
  subTitle?: string;
  accessoryLeft?: string;
  alignment?: 'start' | 'center';
  action: Function;
};

export const CustomTopNavigation = (props: CustomTopNavigationProps) => {
  return (
    <TopNavigation
      accessoryLeft={
        props.accessoryLeft ? <TopNavigationAction icon={BackIcon} onPress={() => props.action()} /> : <></>
      }
      accessoryRight={() => <TopNavigationAction icon={SettingsIcon} onPress={() => props.action()} />}
      alignment={props.alignment}
      // title={evaProps => <Text {...evaProps}>{props.title}</Text>}
      title={() => (
        <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar source={require('../assets/images/icon.png')} />
          <Text style={{ marginLeft: pxToDp(10) }}>{props.title}</Text>
        </Layout>
      )}
      subtitle={evaProps => (props.subTitle ? <Text {...evaProps}>{props.subTitle}</Text> : <></>)}
    />
  );
};
