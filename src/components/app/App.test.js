import userEvent from '@testing-library/user-event';
import App from './App';
import { usersState } from '../../atoms/usersState.atom';
import RecoilObserver from '../../test/helpers';
import { render, screen, waitFor } from '../../test/testing-library';

const mockChange = jest.fn();

describe('App flow', () => {
  it('should render user', async () => {
    render(
      <>
        <RecoilObserver node={usersState} onChange={mockChange} /> <App />
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
        <RecoilObserver node={usersState} onChange={mockChange} /> <App />
      </>
    );

    const addBtn = screen.getByRole('button', { name: 'Add' });

    userEvent.click(addBtn);

    expect(mockChange).toHaveBeenCalledTimes(3);

    await waitFor(() => {
      const usersHolder = screen.getByTestId('test-users-holder');
      const item = usersHolder.children;

      expect(item).toHaveLength(3);
    });
  });

  it('should remove user', async () => {
    render(
      <>
        <RecoilObserver node={usersState} onChange={mockChange} /> <App />
      </>
    );

    const removeBtn = screen.getByRole('button', { name: 'Remove' });

    userEvent.click(removeBtn);

    expect(mockChange).toHaveBeenCalledTimes(3);

    await waitFor(() => {
      const usersHolder = screen.getByTestId('test-users-holder');
      const item = usersHolder.children;

      expect(item).toHaveLength(1);
    });
  });
});
