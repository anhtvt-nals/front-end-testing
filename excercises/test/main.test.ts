import { describe, it, beforeEach, expect, vi } from 'vitest';
import { render } from '../src/main';

describe('Vite + TypeScript App', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    container = document.querySelector('#app')!;
    render();
  });

  it('renders the app correctly', () => {
    expect(container).toBeTruthy();
    expect(container.innerHTML).toContain('Vite + TypeScript');
    expect(container.querySelector('a[href="https://vite.dev"]')).not.toBeNull();
    expect(container.querySelector('a[href="https://www.typescriptlang.org/"]')).not.toBeNull();
  });

  it('sets up the counter button', () => {
    const counterButton = container.querySelector<HTMLButtonElement>('#counter');
    expect(counterButton).not.toBeNull();
    setTimeout(() => {
      expect(counterButton?.innerHTML).toBe('count is 0');
    });
  });

  it('trigger the counter button to increase counter', () => {
    const counterButton = container.querySelector<HTMLButtonElement>('#counter');
    expect(counterButton).not.toBeNull();
    counterButton?.click();
    expect(counterButton?.innerHTML).toBe('count is 1');
  });
});
