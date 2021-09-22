import { snapshot_UNSTABLE } from 'recoil';
import { usersState } from '../atoms/usersState.atom';
import { getUserById } from './getUserById.selector';

describe('get user by id', () => {
  it('should return user by id', async () => {
    const initialSnapshot = snapshot_UNSTABLE();
    expect(
      initialSnapshot.getLoadable(getUserById(1)).valueOrThrow()
    ).toStrictEqual([]);

    const nextState = snapshot_UNSTABLE(({ set }) =>
      set(usersState, [
        {
          id: 1,
          name: 'test 1',
        },
        {
          id: 2,
          name: 'test 2',
        },
      ])
    );

    expect(nextState.getLoadable(getUserById(2)).valueOrThrow()).toStrictEqual([
      {
        id: 2,
        name: 'test 2',
      },
    ]);
  });
});
