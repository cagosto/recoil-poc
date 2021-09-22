import { textState } from '../../atoms/textState.atom';
import { usersState } from '../../atoms/usersState.atom';
import RecoilObserver from '../../test/helpers';
import { render, screen, waitFor } from '../../test/testing-library';
import TextInput from './TextInput.component';
import userEvent from '@testing-library/user-event';
import { snapshot_UNSTABLE } from 'recoil';

const mockChange = jest.fn();
const mockUserChange = jest.fn();

describe('add user input', () => {
  it('should post user to DB and add user to state', async () => {
    render(
      <>
        <RecoilObserver node={textState} onChange={mockChange} />
        <RecoilObserver node={usersState} onChange={mockUserChange} />
        <TextInput />
      </>
    );

    const initialSnapshot = snapshot_UNSTABLE();
    const input = screen.getByPlaceholderText('Full Name');
    const form = screen.getByTestId('test-form-add-user');
    const submit = screen.getByRole('button', { name: 'Submit' });

    expect(
      initialSnapshot.getLoadable(usersState).valueOrThrow()
    ).toStrictEqual([]);
    expect(input).toBeInTheDocument();
    expect(form).toBeInTheDocument();
    userEvent.type(input, 'C');

    expect(mockChange).toHaveBeenCalledWith('C');
    expect(mockChange).toHaveBeenCalledTimes(2);

    userEvent.click(submit);

    await waitFor(() => {
      expect(mockUserChange).toHaveBeenCalledTimes(2);
      expect(mockUserChange).toHaveBeenCalledWith([
        {
          name: 'test three',
          id: 3,
        },
      ]);
    });
  });
});
