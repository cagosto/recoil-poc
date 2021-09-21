import CharacterCount from './Components/characterCount.component';
import TextInput from './Components/textInput.component';
import React from 'react';
import useFetchUser from './hooks/useFetchUser.hook';
import { useSetRecoilState } from 'recoil';
import { usersState } from './atoms/usersState.atom';

function App() {
  const users = useFetchUser();
  const updateUserState = useSetRecoilState(usersState);
  const addUser = () => {
    updateUserState((users) => [
      ...users,
      {
        id: 11,
        name: 'carlos agosto',
      },
    ]);
  };
  const removeUser = () => {
    const copyUser = [...users].filter((user) => user.id !== 3);

    updateUserState(copyUser);
  };

  return (
    <div className="App">
      <TextInput />
      <CharacterCount />
      <br />
      <br />
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={addUser}>Add</button>
      <button onClick={removeUser}>Remove</button>
    </div>
  );
}

export default App;
