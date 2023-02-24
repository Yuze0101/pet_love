import { queryDetail } from '../api';
import storage from './storage';
export const userQueryDetailAndSaveData = async () => {
  const res = (await queryDetail({})) as any;
  console.log('userQueryDetailAndSaveData is ' + JSON.stringify(res));
  if (res.success) {
    await storage.save({
      key: 'userInfo',
      data: res.data.userInfo,
    });
    await storage.save({
      key: 'petInfoList',
      data: res.data?.petInfoList,
    });
  }
};
