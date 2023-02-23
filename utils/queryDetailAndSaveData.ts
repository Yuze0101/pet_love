import { queryDetail } from '../api';
import storage from './storage';
export const userQueryDetailAndSaveData = async () => {
  const res = (await queryDetail({})) as any;
  if (res.success) {
    storage.save({
      key: 'userInfo',
      data: res.data.userInfo,
    });
    storage.save({
      key: 'petInfoList',
      data: res.data?.petInfoList ?? [],
    });
  }
};
