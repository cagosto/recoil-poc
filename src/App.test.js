import App from './App';
import { render, screen } from './test/testing-library';

describe('App flow', () => {
  it('should render user', async () => {
    render(<App />);
    const usersHolder = await screen.findByTestId('test-users-holder');

    expect(usersHolder).toBeInTheDocument();
  });
});
