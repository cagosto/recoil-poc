import userEvent from '@testing-library/user-event';
import { usersState } from '../../atoms/usersState.atom';
import RecoilObserver from '../../test/helpers';
import { renderWithRouts, screen, waitFor } from '../../test/testing-library';
import Landing from './landing';

const mockChange = jest.fn();

describe('App flow', () => {
  it('should render users', async () => {
    renderWithRouts(
      <>
        <RecoilObserver node={usersState} onChange={mockChange} /> <Landing />
      </>
    );

    const item = await screen.findAllByTestId('test-user-loader');

    expect(mockChange).toHaveBeenCalledTimes(2);
    expect(item).toHaveLength(2);
  });

  it('should add user', async () => {
    renderWithRouts(
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
      const item = screen.getAllByTestId('test-user-loader');

      expect(item).toHaveLength(3);
      expect(mockChange).toHaveBeenCalledTimes(3);
    });

    await waitFor(() => {
      const count = screen.getByTestId('test-character-count');

      expect(count).toHaveTextContent(name.length);
    });
  });

  it('should remove user', async () => {
    renderWithRouts(
      <>
        <RecoilObserver node={usersState} onChange={mockChange} /> <Landing />
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
