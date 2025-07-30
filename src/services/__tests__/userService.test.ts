import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchUsers } from '@/services/userService';
import type { User } from '@/types/user';

beforeEach(() => {
  vi.restoreAllMocks();
});

const mockUsers: User[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Smith',
    maidenName: '',
    age: 30,
    gender: 'female',
    phone: '+1234567890',
    email: 'alice@example.com',
    image: '',
    height: 160,
    weight: 55,
    address: {
      city: 'Testville',
      country: 'Testland',
    },
  },
];

describe('fetchUsers', () => {
  it('should fetch users with correct URL and return data', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => ({
            users: mockUsers,
            total: 1,
          }),
        }),
      ),
    );

    const result = await fetchUsers({ limit: 5, skip: 0, gender: 'female' });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://dummyjson.com/users?limit=5&skip=0&gender=female'),
    );

    expect(result.users).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it('should throw an error if response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false })),
    );

    await expect(fetchUsers(undefined, false)).rejects.toThrow('Failed to fetch users');
  });
});
