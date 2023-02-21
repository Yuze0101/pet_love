import { createContext } from 'react';

export type Pet = {
  id: number;
  name: string;
  portraitUrl: string;
  age: number;
  birthday: Date;
  gender: 'MALE' | 'FEMALE';
  type: 'CAT' | 'DOG' | 'OTHER';
  weight: string;
  desc: string;
  cardCount: number;
  fansCount: number;
};
export const initialState: any = [];
export const PetContext = createContext(initialState);
