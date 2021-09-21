import { rest } from 'msw';

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
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
  rest.post('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'test three',
          id: 3,
        },
      ])
    );
  }),
];
