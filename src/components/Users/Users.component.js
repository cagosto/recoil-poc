import React, { useEffect } from 'react';
import { usersState } from '../../atoms/usersState.atom';
import { getUsers } from '../../selector/getUsers.selector';
import User from '../User/index.component';
const { useRecoilValueLoadable, useRecoilState } = require('recoil');

export default function Users() {
  const userNameLoadable = useRecoilValueLoadable(getUsers);
  const [userList, setUserList] = useRecoilState(usersState);

  const removeUser = (id) => {
    setUserList((prev) => prev.filter((u) => u.id !== id));
  };

  useEffect(() => {
    if (userNameLoadable.state === 'hasValue') {
      setUserList(userNameLoadable.contents);
    }
  }, [setUserList, userNameLoadable]);

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
