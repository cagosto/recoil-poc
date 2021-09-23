import { selector } from 'recoil';
import { usersState } from '../atoms/usersState.atom';

export const getUsers = selector({
  key: 'getUsers', // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const users = get(usersState);
    if (users.length <= 0) {
      const users = await fetch(`${process.env.REACT_APP_DOMAIN}/users`);

      return users.json();
    }

    return users;
  },
});
