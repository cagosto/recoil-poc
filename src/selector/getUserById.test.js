import { snapshot_UNSTABLE } from 'recoil';
import { usersState } from '../atoms/usersState.atom';
import { mockUsers } from '../mocks/handler';
import { getUserById } from './getUserById.selector';

describe('get user state', () => {
  it('should return user by id', async () => {
    const nextState = snapshot_UNSTABLE(({ set }) =>
      set(usersState, mockUsers)
    );

    expect(
      nextState.getLoadable(getUserById({ id: 2 })).valueOrThrow()
    ).toStrictEqual(mockUsers.slice(1));
  });

  it('should return user name', () => {
    const nextState = snapshot_UNSTABLE(({ set }) =>
      set(usersState, mockUsers)
    );

    expect(
      nextState.getLoadable(getUserById({ id: 2, data: 'name' })).valueOrThrow()
    ).toStrictEqual(mockUsers.slice(1)[0].name);
  });
});
