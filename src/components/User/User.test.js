import userEvent from '@testing-library/user-event';
import { renderWithRouts, screen } from '../../test/testing-library';
import User from './index.component';

const removeUser = jest.fn();

describe('user component', () => {
  it('should render user', () => {
    renderWithRouts(
      <User
        data={{
          name: 'test',
          id: 1,
        }}
        removeUser={removeUser}
      />
    );
    const user = screen.getByTestId('test-user-loader');

    expect(user).toBeInTheDocument();
    expect(user).toHaveTextContent('test');
  });

  it('should call remove user btn', () => {
    renderWithRouts(
      <User
        data={{
          name: 'test',
          id: 1,
        }}
        removeUser={removeUser}
      />
    );
    const btn = screen.getByRole('button', { name: 'Remove' });

    userEvent.click(btn);

    expect(removeUser).toHaveBeenCalledTimes(1);
  });
});
