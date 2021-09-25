import React from 'react';
import { useSetRecoilState } from 'recoil';
import { usersState } from '../../atoms/usersState.atom';
import useGetUsersList from '../../hooks/useGetUsersList.hook';
import User from '../User/index.component';

export default function Users() {
  const [userNameLoadable, userList] = useGetUsersList();
  const setUserList = useSetRecoilState(usersState);
  const removeUser = (id) => {
    const update = userList.filter((u) => u.id !== id);

    setUserList(update);
  };

  switch (userNameLoadable.state) {
    case 'hasValue':
      return (
        <div data-testid="test-users-list-holder">
          <h3>Users List</h3>
          {userList.map((user, i) => (
            <User key={i} data={user} removeUser={removeUser} />
          ))}
        </div>
      );
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw userNameLoadable.contents;
    default:
      return null;
  }
}
