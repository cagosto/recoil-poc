import React from 'react';
import useFetchUser from '../../hooks/useFetchUser.hook';
import { useSetRecoilState } from 'recoil';
import { usersState } from '../../atoms/usersState.atom';
import TextInput from '../TextInput/TextInput.component';
import CharacterCount from '../CharacterCount/CharacterCount.component';
import { Link } from 'react-router-dom';

export default function Landing() {
  const [users, errorMessage] = useFetchUser();
  const updateUserState = useSetRecoilState(usersState);
  const removeUser = (id) => {
    const copyUser = users.filter((user) => user.id !== id);

    updateUserState(copyUser);
  };

  return (
    <div data-testid={'test-users-landing'}>
      <h2>Add User</h2>
      <hr />
      <TextInput />
      <CharacterCount />
      <br />
      <br />
      {errorMessage && <p data-testid="test-error-message">{errorMessage}</p>}
      {users.length > 0 && (
        <div data-testid="test-users-holder">
          <h2>Users List</h2>
          <hr />
          {users.map((user) => (
            <div key={user.id} data-testid="test-user-loader">
              <Link to={`/user/${user.id}`}> {user.name}</Link>
              <button onClick={removeUser.bind(null, user.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
