import userEvent from '@testing-library/user-event';
import { usersState } from '../../atoms/usersState.atom';
import RecoilObserver from '../../test/helpers';
import { renderWithRouts, screen, waitFor } from '../../test/testing-library';
import Landing from './landing';

const mockChange = jest.fn();

describe('App flow', () => {
  it('should add user', async () => {
    renderWithRouts(
      <>
        <RecoilObserver node={usersState} onChange={mockChange} /> <Landing />
      </>
    );

    const fullName = screen.getByPlaceholderText('Full Name');
    const formSubmit = screen.getByRole('button', { name: 'Submit' });
    const name = 'Carlos agosto';

    await waitFor(() => {
      const item = screen.getAllByTestId('test-user-loader');

      expect(item).toHaveLength(2);
    });

    userEvent.type(fullName, name);
    userEvent.click(formSubmit);

    await waitFor(() => {
      const item = screen.getAllByTestId('test-user-loader');

      expect(item).toHaveLength(3);
      expect(mockChange).toHaveBeenCalledTimes(3);
    });

    await waitFor(() => {
      const count = screen.getByTestId('test-character-count');

      expect(count).toHaveTextContent(name.length);
    });
  });
});
