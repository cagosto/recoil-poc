import { renderRecoilHook } from 'react-recoil-hooks-testing-library';
import useFetchUser from './useFetchUser.hook';
import { server } from '../mocks/server';

describe('fetch user hook', () => {
  it.only('should throw error message', async () => {
    server.resetHandlers(
      `${process.env.REACT_APP_DOMAIN}/users`,
      (req, res, ctx) => res(ctx.status(404))
    );
    const { result, waitForNextUpdate } = renderRecoilHook(useFetchUser);

    expect(result.all).toStrictEqual([]);

    await waitForNextUpdate();
    expect(result.error).toBeDefined();
  });
});
