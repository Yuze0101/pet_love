import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,
  storageBackend: AsyncStorage,
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: null,
  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,
  // 自定义sync方法
  //   sync: require('你可以另外写一个文件专门处理sync'),
});

export default storage;
