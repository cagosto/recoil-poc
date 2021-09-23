import { renderWithRouts, screen, waitFor } from '../../test/testing-library';
import Landing from './landing';
import { server } from '../../mocks/server';
import { rest } from 'msw';

/**
 * Error go in its own test file cause I cant figure out how to empty state after each test.
 */
describe('App flow', () => {
  it('should display error', async () => {
    server.resetHandlers(
      rest.get(`${process.env.REACT_APP_DOMAIN}/users`, (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    renderWithRouts(<Landing />);
    const landingPage = await screen.findByTestId('test-users-landing');

    expect(landingPage).toBeInTheDocument();

    const errorMessage = await waitFor(() =>
      screen.getByTestId('test-error-message')
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
