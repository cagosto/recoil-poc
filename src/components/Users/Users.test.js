import { usersState } from '../../atoms/usersState.atom';
import RecoilObserver from '../../test/helpers';
import { renderWithRouts, screen, waitFor } from '../../test/testing-library';
import Users from './Users.component';
import userEvent from '@testing-library/user-event';

const mockChange = jest.fn();

describe('users list', () => {
  it('should render users list', async () => {
    renderWithRouts(
      <>
        <RecoilObserver node={usersState} onChange={mockChange} /> <Users />
      </>
    );
    const item = await screen.findAllByTestId('test-user-loader');

    expect(mockChange).toHaveBeenCalledTimes(2);
    expect(item).toHaveLength(2);
  });

  it('should remove user', async () => {
    renderWithRouts(
      <>
        <RecoilObserver node={usersState} onChange={mockChange} /> <Users />
      </>
    );
    const item = await screen.findAllByTestId('test-user-loader');
    const removeBtn = screen.getAllByRole('button', { name: 'Remove' });

    expect(item).toHaveLength(2);

    userEvent.click(removeBtn[0]);

    expect(mockChange).toHaveBeenCalledTimes(3);

    await waitFor(() => {
      const item = screen.getAllByTestId('test-user-loader');

      expect(item).toHaveLength(1);
    });
  });
});
