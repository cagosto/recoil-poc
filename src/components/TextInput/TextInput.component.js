import { useRecoilState, useSetRecoilState } from 'recoil';
import { textState } from '../../atoms/textState.atom';
import { usersState } from '../../atoms/usersState.atom';
import { addUser } from '../../utils/index';

function TextInput() {
  const [text, setText] = useRecoilState(textState);
  const updateUser = useSetRecoilState(usersState);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: text }),
    })
      .then((response) => response.json())
      .then((data) => {
        updateUser((currState) => addUser(currState, data));
      });
  };

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} data-testid="test-form-add-user">
          <input
            type="text"
            value={text}
            onChange={onChange}
            placeholder="Full Name"
            name="add user"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default TextInput;
