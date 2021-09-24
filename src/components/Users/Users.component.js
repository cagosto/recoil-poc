import React from 'react';
import { useSetRecoilState } from 'recoil';
import { usersState } from '../../atoms/usersState.atom';
import useGetUsersList from '../../hooks/useGetUsersList.hook';
import User from '../User/index.component';

export default function Users() {
  const [userNameLoadable, userList] = useGetUsersList();
  const setUserList = useSetRecoilState(usersState);
  const removeUser = (id) => {
    setUserList((prev) => prev.filter((u) => u.id !== id));
  };

  switch (userNameLoadable.state) {
    case 'hasValue':
      return (
        <div>
          <h3>Users List</h3>
          {userList.map((user) => (
            <User key={user.id} data={user} removeUser={removeUser} />
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
