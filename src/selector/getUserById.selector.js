import { selectorFamily } from 'recoil';
import { usersState } from '../atoms/usersState.atom';

export const getUserById = selectorFamily({
  key: 'getUserById',
  get:
    ({ id, data }) =>
    ({ get }) => {
      const user = get(usersState);
      const userInfo = user.filter((user) => user.id === Number(id));
      // Pulling different state slices from one selector
      switch (data) {
        case 'name':
          return userInfo[0] ? userInfo[0].name : null;
        case 'email':
          return userInfo[0] ? userInfo[0].email : null;
        default:
          return userInfo;
      }
    },
});
