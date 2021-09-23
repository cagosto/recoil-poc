import { rest } from 'msw';

export const handlers = [
  rest.get(`${process.env.REACT_APP_DOMAIN}/users`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'test one',
          id: 1,
        },
        {
          name: 'test two',
          id: 2,
        },
      ])
    );
  }),
  rest.post(`${process.env.REACT_APP_DOMAIN}/users`, (req, res, ctx) => {
    return res(
      ctx.json({
        name: 'test three',
        id: 3,
      })
    );
  }),
];
