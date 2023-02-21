import { useState } from 'react';
type Actions = {
  type: string;
};
export const useAsyncReducer = (reducer: Function, initState: any) => {
  const [state, setState] = useState(initState);
  return [state, async (action: Actions) => setState(await reducer(state, action))];
};
