import { Route } from 'react-router';
import { mockUsers } from '../../mocks/handler';
import { renderWithRouts, screen, waitFor } from '../../test/testing-library';
import UserInfo from './UserInfo';

describe('render user info', () => {
  it('should render user info', async () => {
    renderWithRouts(
      <Route path="/user/:id">
        <UserInfo />
      </Route>,
      {
        route: '/user/1',
      }
    );

    const userHolder = await screen.findByTestId('test-user-info');

    expect(userHolder).toBeInTheDocument();

    const { name } = mockUsers[0];

    await waitFor(() => {
      const userHolder = screen.getByTestId('test-user-info-data');
      const items = userHolder.children;

      expect(userHolder).toBeInTheDocument();
      expect(items[0]).toHaveTextContent(name);
    });
  });
});
