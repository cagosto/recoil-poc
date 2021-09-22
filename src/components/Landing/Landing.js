import React from 'react';
import useFetchUser from '../../hooks/useFetchUser.hook';
import { useSetRecoilState } from 'recoil';
import { usersState } from '../../atoms/usersState.atom';
import TextInput from '../TextInput/TextInput.component';
import CharacterCount from '../CharacterCount/CharacterCount.component';
import { Link } from 'react-router-dom';

export default function Landing() {
  const users = useFetchUser();
  const updateUserState = useSetRecoilState(usersState);
  const removeUser = (id) => {
    const copyUser = [...users].filter((user) => user.id !== id);

    updateUserState(copyUser);
  };

  return (
    <div>
      <TextInput />
      <CharacterCount />
      <br />
      <br />
      {users.length > 0 && (
        <div data-testid="test-users-holder">
          {users.map((user) => (
            <div key={user.id}>
              <Link to={`/user/${user.id}`}> {user.name}</Link>
              <button onClick={removeUser.bind(null, user.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
