import { renderRecoilHook } from 'react-recoil-hooks-testing-library';
import useGetUsersList from './useGetUsersList.hook';
import { rest } from 'msw';
import { server } from '../mocks/server';

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
    const { result, waitForNextUpdate } = renderRecoilHook(useGetUsersList);
    const currentState = result.current[0].state;
    const currentUsersList = result.current[1];

    expect([currentState, currentUsersList]).toStrictEqual(['loading', []]);

    await waitForNextUpdate();

    const nextState = result.current[0].state;
    const nextUsersList = result.current[1];

    expect([nextState, nextUsersList]).toStrictEqual(['hasError', []]);
  });
});
