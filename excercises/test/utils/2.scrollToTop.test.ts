import { describe, it, expect, vi } from 'vitest';
import { useScrollToTop } from '../../src/utils/2.scrollToTop';
import { afterEach } from 'vitest';

describe('useScrollToTop', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should scroll to the top of the document', () => {
    const scrollToMock = vi.fn();
    const element = { scrollTo: scrollToMock } as unknown as HTMLElement;
    const { scrollToTop } = useScrollToTop(element);
    scrollToTop();
    expect(scrollToMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  });

  it('should scroll to the top of a specific element', () => {
    const scrollToMock = vi.fn();
    const element = { scrollTo: scrollToMock } as unknown as HTMLElement;
    const { scrollToTop } = useScrollToTop(element);
    scrollToTop();
    expect(scrollToMock).toHaveBeenCalledWith({
      behavior: 'smooth',
      top: 0,
      left: 0,
    });
  });
});