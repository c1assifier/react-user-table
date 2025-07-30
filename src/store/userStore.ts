import { makeAutoObservable, runInAction } from 'mobx';
import { fetchUsers } from '@/services/userService';
import type { User } from '@/types/user';
import type { SortField } from '@/types/sort';

type SortOrder = 'asc' | 'desc';

export class UserStore {
  users: User[] = [];
  total = 0;
  limit = 20;
  currentPage = 1;

  isLoading = false;
  error: string | null = null;

  sortParams: Partial<Record<SortField, SortOrder>> = {};
  genderFilter: 'male' | 'female' | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get skip() {
    return (this.currentPage - 1) * this.limit;
  }

  get totalPages() {
    return Math.ceil(this.total / this.limit);
  }

  async loadUsers() {
    this.isLoading = true;
    this.error = null;

    const sortField = Object.keys(this.sortParams)[0] as SortField | undefined;
    const sortOrder = sortField ? this.sortParams[sortField] : undefined;

    try {
      const { users, total } = await fetchUsers({
        limit: this.limit,
        skip: this.skip,
        gender: this.genderFilter ?? undefined,
        sortBy: sortField,
        order: sortOrder,
      });

      runInAction(() => {
        this.users = users;
        this.total = total;
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = (err as Error).message;
        this.isLoading = false;
      });
    }
  }

  setSortDirectly(field: SortField, order: SortOrder | null) {
    runInAction(() => {
      if (order) {
        this.sortParams = { [field]: order };
      } else {
        delete this.sortParams[field];
      }
      this.currentPage = 1;
    });

    this.loadUsers();
  }

  setGenderFilter(value: 'male' | 'female' | null) {
    runInAction(() => {
      this.genderFilter = value;
      this.currentPage = 1;
    });

    this.loadUsers();
  }

  getSortOrder(field: SortField): SortOrder | 'none' {
    return this.sortParams[field] ?? 'none';
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      runInAction(() => {
        this.currentPage = page;
      });
      this.loadUsers();
    }
  }
}

export const userStore = new UserStore();
