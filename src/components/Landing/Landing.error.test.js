import { renderWithRouts, screen } from '../../test/testing-library';
import Landing from './landing';
import { server } from '../../mocks/server';
import { waitForAll } from 'recoil';

describe('App flow', () => {
  it('should display error', async () => {
    server.resetHandlers(
      `${process.env.REACT_APP_DOMAIN}/users`,
      (req, res, ctx) => res(ctx.status(404))
    );

    renderWithRouts(
      <>
        <Landing />
      </>
    );

    await waitForAll(() => {
      const landingPage = screen.getAllByTestId('test-users-landing');

      expect(landingPage).toBeInTheDocument();
    });
  });
});
