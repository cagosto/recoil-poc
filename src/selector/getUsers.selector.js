import { selectorFamily } from 'recoil';

export const getUsers = selectorFamily({
  key: 'getUsers', // unique ID (with respect to other atoms/selectors)
  get: (users) => async () => {
    if (users.length <= 0) {
      const users = await fetch('https://jsonplaceholder.typicode.com/users');

      return users.json();
    }

    return users;
  },
});
