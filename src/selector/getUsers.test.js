import { waitFor } from '@testing-library/react';
import { snapshot_UNSTABLE } from 'recoil';
import { getUsers } from './getUsers.selector';

describe('get users', () => {
  it('should fetch users', async () => {
    await waitFor(() => {
      const initialSnapshot = snapshot_UNSTABLE();

      expect(
        initialSnapshot.getLoadable(getUsers).valueOrThrow()
      ).toStrictEqual([
        {
          name: 'test one',
          id: 1,
        },
        {
          name: 'test two',
          id: 2,
        },
      ]);
    });
  });
});
