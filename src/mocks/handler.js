import { rest } from 'msw';

export const mockUsers = [
  {
    name: 'test one',
    id: 1,
  },
  {
    name: 'test two',
    id: 2,
  },
];

export const mockPostUser = {
  name: 'test three',
  id: 3,
};

export const handlers = [
  rest.get(`${process.env.REACT_APP_DOMAIN}/users`, (req, res, ctx) => {
    return res(ctx.json(mockUsers));
  }),
  rest.post(`${process.env.REACT_APP_DOMAIN}/users`, (req, res, ctx) => {
    return res(ctx.json(mockPostUser));
  }),
];
