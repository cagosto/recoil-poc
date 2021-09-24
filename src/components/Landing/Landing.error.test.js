import { renderWithRouts, screen, waitFor } from '../../test/testing-library';
import Landing from './landing';
import axios from 'axios';

jest.mock('axios');

/**
 * Error go in its own test file cause I cant figure out how to empty state after each test.
 */
describe('App flow', () => {
  it('should display error', async () => {
    axios.get.mockRejectedValueOnce();
    renderWithRouts(<Landing />);
    const landingPage = await screen.findByTestId('test-users-landing');

    expect(landingPage).toBeInTheDocument();

    const errorMessage = await waitFor(() =>
      screen.getByTestId('test-error-message')
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
