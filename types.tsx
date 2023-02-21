/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
  TabOne: undefined;
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
  PetInfo: undefined;
};

export type UserCenterScreenProps<Screen extends keyof UserCenterParamList> = NativeStackScreenProps<
  UserCenterParamList,
  Screen
>;

export enum ActioinType {
  getUserInfo = 'GET_USER_INFO',
  getPetInfo = 'GET_PET_INFO',
}
export type Actions = {
  type: ActioinType;
};
export type Pet = {
  id?: number;
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
