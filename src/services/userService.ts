import type { User } from '@/types/user';

export const fetchUsers = async (limit = 20, skip = 0): Promise<User[]> => {
  const res = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('Failed to fetch users');
  const data = await res.json();
  return data.users;
};
