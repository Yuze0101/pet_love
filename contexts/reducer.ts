import storage from '../utils/storage';
import { User } from './UserContext';
import { Pet } from './PetContext';
import { Actions, ActioinType } from '../types';

export const reducer = async (state: any, action: Actions) => {
  console.log('state : ' + JSON.stringify(state) + ' action : ' + JSON.stringify(action));
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
    case ActioinType.getPetInfo:
      const petInfo: Pet[] = await new Promise((resolve, reject) => {
        storage
          .load({
            key: 'petInfo',
          })
          .then(value => {
            resolve(value);
          })
          .catch(error => {
            console.log('Err: ' + error);
            reject(error);
          });
      });
      return [...petInfo];
  }
};
