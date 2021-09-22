import { selectorFamily } from 'recoil';
import { usersState } from '../atoms/usersState.atom';

export const getUserById = selectorFamily({
  key: 'getUserById',
  get:
    (id) =>
    ({ get }) => {
      const user = get(usersState);
      return user.filter((user) => user.id === Number(id));
    },
});
