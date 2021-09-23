import { renderRecoilHook } from 'react-recoil-hooks-testing-library';
import useFetchUser from './useFetchUser.hook';
import { server } from '../mocks/server';
import { rest } from 'msw';

/**
 * Error go in its own test file cause I cant figure out how to empty state after each test.
 */
describe('fetch user hook', () => {
  it('should throw error message', async () => {
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
