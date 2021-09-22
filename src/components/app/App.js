import React from 'react';
import useFetchUser from '../../hooks/useFetchUser.hook';
import { useSetRecoilState } from 'recoil';
import { usersState } from '../../atoms/usersState.atom';
import TextInput from '../textInput/textInput.component';
import CharacterCount from '../characterCount/characterCount.component';

function App() {
  const users = useFetchUser();
  const updateUserState = useSetRecoilState(usersState);
  const removeUser = (id) => {
    const copyUser = [...users].filter((user) => user.id !== id);

    updateUserState(copyUser);
  };

  return (
    <div className="App">
      <TextInput />
      <CharacterCount />
      <br />
      <br />
      {users.length > 0 && (
        <div data-testid="test-users-holder">
          {users.map((user) => (
            <div key={user.id}>
              {user.name}{' '}
              <button onClick={removeUser.bind(null, user.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
