import { describe, it, expect } from 'vitest';
import { validateUserInput, UserInput } from '../../src/utils/3.input';
describe('validateUserInput', () => {

  it('should return errors for empty input', () => {
    const input: UserInput = {
      username: '',
      email: '',
      password: '',
    };
    const result = validateUserInput(input);
    expect(result).toEqual([
      'Username is required',
      'Email is required',
      'Password is required',
      'Password must contain at least one uppercase letter'
    ]);
  });

  it('should return errors for invalid input', () => {
    const input: UserInput = {
      username: 'ab',
      email: 'invalid-email',
      password: 'short',
    };
    const result = validateUserInput(input);
    expect(result).toEqual([
      'Username must be between 3 and 20 characters',
      'Email is invalid',
      'Password must be between 6 and 40 characters',
      'Password must contain at least one uppercase letter'
    ]);
  }
  );

  it('should return true for valid input', () => {
    const input: UserInput = {
      username: 'validuser',
      email: 'test@example.com',
      password: 'ValidPassword123',
    };
    const result = validateUserInput(input);
    expect(result).toBe(true);
  });

  it('should handle whitespace in username', () => {
    const input: UserInput = {
      username: '   ',
      email: 'test@example.com', 
      password: 'ValidPassword123',
    };
    const result = validateUserInput(input);
    expect(result).toContain('Username is required');
  });

  it('should validate username length correctly', () => {
    const input: UserInput = {
      username: 'a'.repeat(21),
      email: 'test@example.com',
      password: 'ValidPassword123',
    };
    const result = validateUserInput(input);
    expect(result).toContain('Username must be between 3 and 20 characters');
  });

  it('should validate email format', () => {
    const input: UserInput = {
      username: 'validuser',
      email: 'test@.com',
      password: 'ValidPassword123',
    };
    const result = validateUserInput(input);
    expect(result).toContain('Email is invalid');
  });

  it('should validate password complexity', () => {
    const input: UserInput = {
      username: 'validuser',
      email: 'test@example.com',
      password: 'validpassword123',
    };
    const result = validateUserInput(input);
    expect(result).toContain('Password must contain at least one uppercase letter');
  });

});