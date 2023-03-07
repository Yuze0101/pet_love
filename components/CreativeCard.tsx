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

const renderImageList = (prop: string[]) => {
  const [imageList, setImageList] = useState(prop);
  switch (imageList.length) {
    case 1:
      return <CacheImage resizeMode={'contain'} style={{ flex: 1, height: '100%' }} source={{ uri: imageList[0] }} />;
    case 2:
      return (
        <Layout style={{ flex: 1, flexDirection: 'row' }}>
          <CacheImage resizeMode={'contain'} style={{ flex: 1, height: '100%' }} source={{ uri: imageList[0] }} />
          <CacheImage resizeMode={'contain'} style={{ flex: 1, height: '100%' }} source={{ uri: imageList[1] }} />
        </Layout>
      );
    case 3:
      return (
        <Layout style={{ flex: 1, flexDirection: 'row' }}>
          <CacheImage resizeMode={'contain'} style={{ flex: 1, height: '100%' }} source={{ uri: imageList[0] }} />
          <Layout style={{ flex: 1, flexDirection: 'column' }}>
            <CacheImage resizeMode={'contain'} style={{ flex: 1, height: '100%' }} source={{ uri: imageList[1] }} />
            <CacheImage resizeMode={'contain'} style={{ flex: 1, height: '100%' }} source={{ uri: imageList[2] }} />
          </Layout>
        </Layout>
      );
    default:
      return <></>;
  }
};

export const CreativeCard = (props: Props) => {
  if (!props.imageList) return null;
  return (
    <Card header={props.header} footer={props.footer}>
      <Layout style={{ height: pxToDp(180), flexDirection: 'row' }}>{renderImageList(props.imageList)}</Layout>
      <Text category="p1" numberOfLines={3}>
        {props.content}
      </Text>
    </Card>
  );
};
