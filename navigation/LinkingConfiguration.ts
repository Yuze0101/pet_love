/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Welcome: 'welcome',
      Login: 'login',
      Register: {
        path: 'register/:status',
        parse: {
          status: status => status,
        },
      },
      Root: {
        path: 'root',
        screens: {
          TabOne:{
            screens:{
              
            }
          },
          UserCenter: {
            screens: {
              
            },
          },
        },
      },
      // Root: {
      //   screens: {
      //     TabOne: {
      //       screens: {
      //         TabOneScreen: 'one',
      //       },
      //     },
      //     TabTwo: {
      //       screens: {
      //         TabTwoScreen: 'two',
      //       },
      //     },
      //   },
      // },
      // Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
