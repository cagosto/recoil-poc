import { renderRecoilHook } from 'react-recoil-hooks-testing-library';
import useFetchUser from './useFetchUser.hook';
import { server } from '../mocks/server';
import { rest } from 'msw';

describe('fetch user hook', () => {
  it.only('should throw error message', async () => {
    server.resetHandlers(
      rest.get(`${process.env.REACT_APP_DOMAIN}/users`, (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    const { result, waitForNextUpdate } = renderRecoilHook(useFetchUser);

    expect(result.all).toStrictEqual([]);

    await waitForNextUpdate();

    expect(result.current).toStrictEqual([[], 'bad request']);
  });
});
