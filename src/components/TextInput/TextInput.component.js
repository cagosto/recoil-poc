import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { textState } from '../../atoms/textState.atom';
import { usersState } from '../../atoms/usersState.atom';
import { addUser } from '../../utils/index';

function TextInput() {
  const [text, setText] = useRecoilState(textState);
  const updateUser = useSetRecoilState(usersState);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_DOMAIN}/users`, {
        name: text,
      })
      .then((response) => response.data)
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
