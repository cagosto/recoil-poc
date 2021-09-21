import { atom } from 'recoil';

export const usersState = atom({
  key: 'usersState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
