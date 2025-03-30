import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setupCounter } from '../src/counter';
import { JSDOM } from 'jsdom';

describe('setupCounter', () => {
  let button: HTMLButtonElement;

  beforeEach(() => {
    button = document.createElement('button');
    document.body.appendChild(button);
  });

  it('should initialize counter with 0', () => {
    setupCounter(button);
    expect(button.innerHTML).toBe('count is 0');
  });

  it('should increment counter when clicked', () => {
    setupCounter(button);
    button.click();
    expect(button.innerHTML).toBe('count is 1');
    button.click();
    expect(button.innerHTML).toBe('count is 2');
  });

  it('should maintain separate counters for different buttons', () => {
    const button2 = document.createElement('button');
    document.body.appendChild(button2);

    setupCounter(button);
    setupCounter(button2);

    button.click();
    expect(button.innerHTML).toBe('count is 1');
    expect(button2.innerHTML).toBe('count is 0');
  });

  afterEach(() => {
    document.body.innerHTML = ''; // Clear the DOM after each test
  });
});