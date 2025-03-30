import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthService } from '../../src/utils/5.authService'

describe('AuthService', () => {
  let authService: AuthService
  let mockFetch: any

  beforeEach(() => {
    authService = new AuthService()
    mockFetch = vi.fn()
    global.fetch = mockFetch
  })

  it('should successfully login and get user profile', async () => {
    const mockToken = 'fake-token'
    const mockUserData = { id: 1, name: 'John Doe' }
    const credentials = { username: 'john', password: 'password123' }

    // Mock first fetch for login
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: mockToken })
      })
    )
    // Mock second fetch for user profile
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUserData)
      })
    )

    const result = await authService.login(credentials)
    expect(mockFetch).toHaveBeenCalledTimes(2)
    expect(mockFetch).toHaveBeenNthCalledWith(1, 'https://fakestoreapi.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
    expect(mockFetch).toHaveBeenNthCalledWith(2, 'https://fakestoreapi.com/auth/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${mockToken}`
      }
    })

    expect(result).toEqual(mockUserData)
  })

  it('should return error message for invalid credentials', async () => {
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: false
      })
    )

    const result = await authService.login({ username: 'wrong', password: 'wrong' })
    expect(result).toBe('Invalid login credentials')
  })

  it('should return error message when token is missing', async () => {
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      })
    )

    const result = await authService.login({ username: 'john', password: 'password123' })
    expect(result).toBe('Invalid login credentials')
  })

  it('should return error message when user profile fetch fails', async () => {
    mockFetch
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ token: 'fake-token' })
        })
      )
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: false
        })
      )

    const result = await authService.login({ username: 'john', password: 'password123' })
    expect(result).toBe('Failed to login')
  })

  it('should return error message when user profile fetch emtpy', async () => {
    mockFetch
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ token: 'fake-token' })
        })
      )
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(null)
        })
      )

    const result = await authService.login({ username: 'john', password: 'password123' })
    expect(result).toBe('Failed to login')
  })
})