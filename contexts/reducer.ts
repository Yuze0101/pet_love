type Actions = {
  type: string;
};
export const reducer = (state: any, action: Actions) => {
  console.log('state : ' + JSON.stringify(state) + 'action : ' + JSON.stringify(action));
  switch (action.type) {
    case 'GET_USER_INFO':
      return {};
    case 'GET_PET_INFO':
      return [];
  }
};
