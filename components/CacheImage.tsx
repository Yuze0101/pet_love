import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Image, ImageStyle } from 'react-native';

type CacheImageProps = {
  source: { uri: string };
  style?: ImageStyle;
};

export function CacheImage(props: CacheImageProps) {
  const [imgUri, setImgUri] = useState();
  useEffect(() => {
    async function loadImg() {
      if (/file:\/\//.test(props.source.uri)) {
        console.log('local Image already exist');
        // @ts-ignore
        setImgUri(props.source.uri);
        return;
      }
      let imgXt = getImgXtension(props.source.uri);
      if (!imgXt || !imgXt.length) {
        console.log('Couldn`t load Image');
        return;
      }
      const cacheFileUri = `${FileSystem.cacheDirectory}${props.source.uri.split('/').pop()}`;
      const imgXistsInCache = await findImageInCache(cacheFileUri);
      if (imgXistsInCache.exists) {
        // @ts-ignore
        setImgUri(cacheFileUri);
      } else {
        const cached = await cacheImage(props.source.uri, cacheFileUri);
        if (cached.isCached) {
          // @ts-ignore
          setImgUri(cached.path as string);
        } else {
          console.log('load image error');
        }
      }
    }
    loadImg();
  }, [props.source.uri]);

  return <Image source={{ uri: imgUri }} style={props.style} />;
}

// 图片类型
function getImgXtension(uri: string) {
  const basename = uri.split(/[\\/]/).pop() as string;
  return /[.]/.exec(basename) ? /[^.]+$/.exec(basename) : undefined;
}

async function findImageInCache(uri: string) {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    return { ...info, err: false };
  } catch (error) {
    return {
      exists: false,
      err: true,
      msg: error,
    };
  }
}

async function cacheImage(uri: string, cacheUri: string) {
  try {
    const downloadImage = FileSystem.createDownloadResumable(uri, cacheUri);
    const downloaded = await downloadImage.downloadAsync();
    return {
      isCached: true,
      err: false,
      path: downloaded?.uri,
    };
  } catch (error) {
    return {
      isCached: false,
      err: true,
      msg: error,
    };
  }
}
