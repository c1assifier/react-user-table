import type { User } from '@/types/user';

export const fetchUsers = async (params?: {
  limit?: number;
  skip?: number;
  gender?: 'male' | 'female';
  sortBy?: string;
  order?: 'asc' | 'desc';
}): Promise<{ users: User[]; total: number }> => {
  const url = new URL('https://dummyjson.com/users');

  if (params?.limit != null) url.searchParams.append('limit', String(params.limit));
  if (params?.skip != null) url.searchParams.append('skip', String(params.skip));
  if (params?.gender) url.searchParams.append('gender', params.gender);
  if (params?.sortBy) url.searchParams.append('sortBy', params.sortBy);
  if (params?.order) url.searchParams.append('order', params.order);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Failed to fetch users');

  const data = await res.json();

  return {
    users: data.users,
    total: data.total,
  };
};
