import { Card, Layout, Text } from '@ui-kitten/components';
import { Image } from 'react-native';

// TODO 线上使用缓存版图片
import { CacheImage } from './CacheImage';
import { RenderProp } from '@ui-kitten/components/devsupport';
import { ViewProps } from 'react-native';
import { pxToDp } from '../constants/Layout';
import { useState } from 'react';
type Props = {
  header?: RenderProp<ViewProps>;
  footer?: RenderProp<ViewProps>;
  imageList?: string[];
  content?: string;
};

const renderImageList = (imageList: string[]) => {
  switch (imageList.length) {
    case 1:
      return (
        <Image
          resizeMode={'contain'}
          style={{ flex: 1, height: '100%' }}
          source={require('../assets/images/locked.png')}
        ></Image>
      );
    case 2:
      return (
        <Layout style={{ flex: 1, flexDirection: 'row' }}>
          <Image
            resizeMode={'contain'}
            style={{ flex: 1, height: '100%' }}
            source={require('../assets/images/locked.png')}
          ></Image>
          <Image
            resizeMode={'contain'}
            style={{ flex: 1, height: '100%' }}
            source={require('../assets/images/locked.png')}
          ></Image>
        </Layout>
      );
    case 3:
      return (
        <Layout style={{ flex: 1, flexDirection: 'row' }}>
          <Image
            style={{ flex: 1, height: '100%' }}
            source={require('../assets/images/locked.png')}
            resizeMode={'contain'}
          ></Image>
          <Layout style={{ flex: 1, flexDirection: 'column' }}>
            <Image
              style={{ flex: 1, width: '100%' }}
              source={require('../assets/images/locked.png')}
              resizeMode={'contain'}
            ></Image>
            <Image
              style={{ flex: 1, width: '100%' }}
              source={require('../assets/images/locked.png')}
              resizeMode={'contain'}
            ></Image>
          </Layout>
        </Layout>
      );
    default:
      return null;
  }
};

export const CreativeCard = (props: Props) => {
  if (!props.imageList) return null;
  return (
    <Card header={props.header} footer={props.footer}>
      <Layout style={{ height: pxToDp(180), flexDirection: 'row' }}>{renderImageList(['1', '2'])}</Layout>
      <Text category="p1" numberOfLines={3}>
        {props.content}
      </Text>
    </Card>
  );
};
