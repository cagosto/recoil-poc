import { snapshot_UNSTABLE } from 'recoil';
import { usersState } from '../atoms/usersState.atom';
import { mockUsers } from '../mocks/handler';
import { getUserById } from './getUserById.selector';

describe('get user by id', () => {
  it('should return user by id', async () => {
    const initialSnapshot = snapshot_UNSTABLE();
    expect(
      initialSnapshot.getLoadable(getUserById(1)).valueOrThrow()
    ).toStrictEqual([]);

    const nextState = snapshot_UNSTABLE(({ set }) =>
      set(usersState, mockUsers)
    );

    expect(nextState.getLoadable(getUserById(2)).valueOrThrow()).toStrictEqual(
      mockUsers.slice(1)
    );
  });
});
