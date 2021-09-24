import { renderRecoilHook } from 'react-recoil-hooks-testing-library';
import useGetUsersList from './useGetUsersList.hook';
import { mockUsers } from '../mocks/handler';

describe('fetch user hook', () => {
  it('should fetch users', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useGetUsersList);
    const currentState = result.current[0].state;
    const currentUsersList = result.current[1];

    expect([currentState, currentUsersList]).toStrictEqual(['loading', []]);

    await waitForNextUpdate();

    const nextState = result.current[0].state;
    const nextUsersList = result.current[1];

    expect([nextState, nextUsersList]).toStrictEqual(['hasValue', mockUsers]);
  });
});
