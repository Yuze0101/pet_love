import React from 'react';
// import { workAround } from '../utils/workArround';
import { Icon, Text, TopNavigation, TopNavigationAction, IconProps, Avatar, Layout } from '@ui-kitten/components';
import { pxToDp } from '../constants/Layout';

const BackIcon = (props: IconProps) => <Icon {...props} name="arrow-back" />;
const CustomIcon = (props: IconProps) => <Icon {...props} name={props.name} />;
type CustomTopNavigationProps = {
  title: string;
  subTitle?: string;
  showLeftBack?: boolean;
  showRight?: boolean;
  alignment?: 'start' | 'center';
  leftAction?: Function;
  rightAction?: Function;
  rightIconName?: string;
};

export const CustomTopNavigation = (props: CustomTopNavigationProps) => {
  return (
    <TopNavigation
      accessoryLeft={
        props.showLeftBack ? (
          <TopNavigationAction
            icon={BackIcon}
            onPress={() => {
              if (props.leftAction) {
                props.leftAction();
              }
            }}
          />
        ) : (
          <></>
        )
      }
      accessoryRight={
        props.showRight ? (
          <TopNavigationAction
            icon={CustomIcon({ name: props.rightIconName })}
            onPress={() => {
              if (props.rightAction) {
                props.rightAction();
              }
            }}
          />
        ) : (
          <></>
        )
      }
      alignment={props.alignment ?? 'center'}
      // title={evaProps => <Text {...evaProps}>{props.title}</Text>}
      title={() => (
        <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Avatar source={require('../assets/images/icon.png')} /> */}
          <Text style={{ marginLeft: pxToDp(10) }}>{props.title}</Text>
        </Layout>
      )}
      subtitle={evaProps => (props.subTitle ? <Text {...evaProps}>{props.subTitle}</Text> : <></>)}
    />
  );
};
