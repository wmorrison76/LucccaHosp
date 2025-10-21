
import { FocusManager } from '../FocusManager';

describe('FocusManager', () => {
  it('remembers and restores focus', () => {
    const el = { focus: vi.fn() } as any;
    FocusManager.remember(el);
    FocusManager.restore();
    expect(el.focus).toHaveBeenCalled();
  });
});
