/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SvgProps } from 'react-native-svg';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  HomeScreen: undefined;
  TabTwo: undefined;
  TabThree: undefined;
  UserCenter: NativeStackScreenProps<UserCenterParamList>;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type UserCenterParamList = {
  Main: undefined;
  PetInfo: PetInfoProps;
  Setting: undefined;
  EditUser: undefined;
  AddPetStory: PetInfoProps;
  ShowPetStory: undefined;
};

export type PetInfoProps = {
  id: number | undefined;
};

export type UserCenterScreenProps<Screen extends keyof UserCenterParamList> = NativeStackScreenProps<
  UserCenterParamList,
  Screen
>;

export enum ActioinType {
  getUserInfo = 'GET_USER_INFO',
  setUserInfo = 'SET_USER_INFO',
  getPetInfo = 'GET_PET_INFO',
  setPetInfo = 'SET_PET_INFO',
}
export type Actions = {
  type: ActioinType;
};
export type Pet = {
  id: number;
  name: string;
  portraitUrl: string;
  age: number;
  birthday: Date;
  gender: 'MALE' | 'FEMALE';
  type: 'CAT' | 'DOG' | 'OTHER';
  weight: string;
  desc: string;
  cardCount: number;
  fansCount: number;
};
export type User = {
  username: string;
  portraitUrl: string;
  follow_count: number;
};

export type TabIconProps = {
  isActive: boolean;
} & SvgProps;

export type CreativeCardProps = {
  avatarUrl?: string;
  userName: string;
  imageUrl?: string;
  releaseTime: Date;
  contentText: string;
};