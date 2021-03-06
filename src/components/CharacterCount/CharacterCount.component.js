import { useRecoilValue } from 'recoil';
import { charCountState } from '../../selector/charCount.selector';

export default function CharacterCount() {
  const count = useRecoilValue(charCountState);
  return <div data-testid="test-character-count">Character Count: {count}</div>;
}
