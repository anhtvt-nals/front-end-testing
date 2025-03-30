import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../../src/utils/4.authService';

describe('AuthService', () => {
  let authService: AuthService;
  const mockFetch = vi.fn();
  
  beforeEach(() => {
    global.fetch = mockFetch;
    authService = new AuthService();
  });

  describe('login', () => {
    it('should return token when login successful', async () => {
      const mockResponse = { token: 'fake-token' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await authService.login({
        username: 'testuser',
        password: 'password123'
      });
      expect(result).toEqual('fake-token');
    });

    it('should throw error when login fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized'
      });

      await expect(authService.login({
        username: 'test',
        password: 'password122'
      })).rejects.toThrow('Login failed');
    });

    it('should throw error when token empty', async () => {
      const mockResponse = {};
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      await expect(authService.login({
        username: 'testuser',
        password: 'password123'
      })).rejects.toThrow('Invalid token');
    });
  });
});