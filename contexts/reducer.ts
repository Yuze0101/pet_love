import storage from '../utils/storage';
import { User, Pet } from '../types';
import { Actions, ActioinType } from '../types';

// TODO 优化存取逻辑，减少异步次数

export const reducer = async (state: any, action: Actions) => {
  console.log(`state is ${JSON.stringify(state)} , actioin is ${JSON.stringify(action)}`);
  switch (action.type) {
    case ActioinType.getUserInfo:
      const userInfo: User = await new Promise((resolve, reject) => {
        storage
          .load({
            key: 'userInfo',
          })
          .then(value => {
            resolve(value);
          })
          .catch(error => {
            console.log('Err: ' + error);
            reject(error);
          });
      });
      return {
        ...userInfo,
      };
    case ActioinType.setUserInfo:
      // await storage.save({
      //   key: 'userInfo',
      //   data: action.data,
      // });
      break;
    case ActioinType.getPetInfo:
      const petInfoList: Pet[] = await new Promise((resolve, reject) => {
        storage
          .load({
            key: 'petInfoList',
          })
          .then(value => {
            resolve(value);
          })
          .catch(error => {
            console.log('Err: ' + error);
            reject(error);
          });
      });
      console.log('reducer return : ' + JSON.stringify(petInfoList));
      if (petInfoList == null) {
        return [];
      } else {
        return [...petInfoList];
      }
  }
};
