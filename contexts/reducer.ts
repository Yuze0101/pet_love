import storage from '../utils/storage';
import { User } from './UserContext';
type Actions = {
  type: string;
};

export const reducer = async (state: any, action: Actions) => {
  console.log('state : ' + JSON.stringify(state) + ' action : ' + JSON.stringify(action));
  switch (action.type) {
    case 'GET_USER_INFO':
      const res: User = await new Promise((resolve, reject) => {
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
        ...res,
      };
    // case 'GET_PET_INFO':
    //   let petInfo = {};
    //   await storage
    //     .load({
    //       key: 'petInfo',
    //     })
    //     .then(value => {
    //       petInfo = value;
    //     })
    //     .catch(error => {
    //       console.log('Err: ' + error);
    //     });
    //   return {
    //     ...petInfo,
    //   };
  }
};
