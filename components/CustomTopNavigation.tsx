import React from 'react';
import { workAround } from '../utils/workArround';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Text, TopNavigation, TopNavigationAction, IconProps } from '@ui-kitten/components';

const BackIcon = (props: IconProps) => <Icon {...workAround(props)} name="arrow-back" />;

const BackAction = () => <TopNavigationAction icon={BackIcon} />;

const TopNavigationStyling = () => (
  <TopNavigation
    title={evaProps => <Text {...evaProps}>Title</Text>}
    subtitle={evaProps => <Text {...evaProps}>Subtitle</Text>}
  />
);

type CustomTopNavigationProps = {
  title: string;
  action: Function;
};

export const CustomTopNavigation = (props: CustomTopNavigationProps) => (
  <TouchableWithoutFeedback onPress={() => props.action()}>
    <TopNavigation accessoryLeft={BackAction} title={props.title} />
  </TouchableWithoutFeedback>
);
