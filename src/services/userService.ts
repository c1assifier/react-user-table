import type { User } from '@/types/user';

const API_URL = 'https://dummyjson.com/users';
const MOCK_URL = '/mocks/users.json'; // для gh-pages

export const fetchUsers = async (
  params?: {
    limit?: number;
    skip?: number;
    gender?: 'male' | 'female';
    sortBy?: string;
    order?: 'asc' | 'desc';
  },
  useMockOnFail: boolean = true,
): Promise<{ users: User[]; total: number }> => {
  const url = new URL(API_URL);

  if (params?.limit != null) url.searchParams.append('limit', String(params.limit));
  if (params?.skip != null) url.searchParams.append('skip', String(params.skip));
  if (params?.gender) url.searchParams.append('gender', params.gender);
  if (params?.sortBy) url.searchParams.append('sortBy', params.sortBy);
  if (params?.order) url.searchParams.append('order', params.order);

  try {
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch users from API');

    const data = await res.json();
    return {
      users: data.users,
      total: data.total,
    };
  } catch (err) {
    if (!useMockOnFail) {
      throw new Error('Failed to fetch users');
    }

    console.warn('API недоступен. Загружаем данные из mocks:', err);

    const mockRes = await fetch(MOCK_URL);
    if (!mockRes.ok) {
      throw new Error(`Ошибка при загрузке мок-данных: ${mockRes.status}`);
    }

    const mockData = await mockRes.json();
    return {
      users: mockData.users,
      total: mockData.total,
    };
  }
};
