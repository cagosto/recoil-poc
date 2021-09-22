import { snapshot_UNSTABLE } from 'recoil';
import { textState } from '../../atoms/textState.atom';
import { charCountState } from '../../selector/charCount.selector';
import { render, screen } from '../../test/testing-library';
import CharacterCount from './characterCount.component';

describe('character count', () => {
  it('should render current character count', () => {
    render(<CharacterCount />);

    const initialSnapshot = snapshot_UNSTABLE();
    const counter = screen.getByTestId('test-character-count');

    expect(initialSnapshot.getLoadable(charCountState).valueOrThrow()).toBe(0);
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveTextContent(0);

    const testSnapshot = snapshot_UNSTABLE(({ set }) => set(textState, 'test'));
    expect(testSnapshot.getLoadable(charCountState).valueOrThrow()).toBe(4);
  });
});
