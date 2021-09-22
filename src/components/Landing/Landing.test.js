import userEvent from '@testing-library/user-event';
import { usersState } from '../../atoms/usersState.atom';
import RecoilObserver from '../../test/helpers';
import { render, screen, waitFor } from '../../test/testing-library';
import Landing from './landing';

const mockChange = jest.fn();

describe('App flow', () => {
  it('should render user', async () => {
    render(
      <>
        <RecoilObserver node={usersState} onChange={mockChange} /> <Landing />
      </>
    );

    const usersHolder = await screen.findByTestId('test-users-holder');
    const item = usersHolder.children;

    expect(mockChange).toHaveBeenCalledTimes(2);
    expect(usersHolder).toBeInTheDocument();
    expect(item).toHaveLength(2);
  });

  it('should add user', async () => {
    render(
      <>
        <RecoilObserver node={usersState} onChange={mockChange} /> <Landing />
      </>
    );

    const fullName = screen.getByPlaceholderText('Full Name');
    const formSubmit = screen.getByRole('button', { name: 'Submit' });
    const name = 'Carlos agosto';
    userEvent.type(fullName, name);
    userEvent.click(formSubmit);

    await waitFor(() => {
      const usersHolder = screen.getByTestId('test-users-holder');
      const item = usersHolder.children;

      expect(item).toHaveLength(3);
      expect(mockChange).toHaveBeenCalledTimes(3);
    });

    await waitFor(() => {
      const count = screen.getByTestId('test-character-count');

      expect(count).toHaveTextContent(name.length);
    });
  });

  it('should remove user', async () => {
    render(
      <>
        <RecoilObserver node={usersState} onChange={mockChange} /> <Landing />
      </>
    );

    const removeBtn = screen.getAllByRole('button', { name: 'Remove' });

    userEvent.click(removeBtn[0]);

    expect(mockChange).toHaveBeenCalledTimes(3);

    await waitFor(() => {
      const usersHolder = screen.getByTestId('test-users-holder');
      const item = usersHolder.children;

      expect(item).toHaveLength(1);
    });
  });
});
