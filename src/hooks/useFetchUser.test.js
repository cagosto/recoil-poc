import { renderRecoilHook } from 'react-recoil-hooks-testing-library';
import useFetchUser from './useFetchUser.hook';
import { mockUsers } from '../mocks/handler';

describe('fetch user hook', () => {
  it('should fetch users', async () => {
    const { result, waitForNextUpdate } = renderRecoilHook(useFetchUser);

    expect(result.all).toStrictEqual([]);

    await waitForNextUpdate();
    expect(result.current).toStrictEqual(mockUsers);
  });
});
