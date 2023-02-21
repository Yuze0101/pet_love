import { createContext } from 'react';

export type User = {
  username: string;
  portraitUrl: string;
  follow_count: number;
};
export const initialState: any = {};
export const UserContext = createContext(initialState);
