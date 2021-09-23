import { snapshot_UNSTABLE } from 'recoil';
import { textState } from '../atoms/textState.atom';
import { charCountState } from './charCount.selector';

describe('charter count', () => {
  it('should return text state count', () => {
    const initialSnapshot = snapshot_UNSTABLE();

    expect(
      initialSnapshot.getLoadable(charCountState).valueOrThrow()
    ).toStrictEqual(0);

    const nextState = snapshot_UNSTABLE(({ set }) => set(textState, 'hi'));

    expect(nextState.getLoadable(charCountState).valueOrThrow()).toBe(2);
  });
});
