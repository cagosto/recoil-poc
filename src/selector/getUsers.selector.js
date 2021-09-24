import { selector } from 'recoil';
import axios from 'axios';

export const getUsers = selector({
  key: 'getUsers', // unique ID (with respect to other atoms/selectors)
  get: async () => {
    return axios
      .get(`${process.env.REACT_APP_DOMAIN}/users`)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        throw error;
      });
  },
});
