import { makeAutoObservable, runInAction } from 'mobx';
import { fetchUsers } from '@/services/userService';
import type { User } from '@/types/user';

export class UserStore {
  users: User[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  loadUsers = async () => {
    this.isLoading = true;
    this.error = null;
    try {
      const users = await fetchUsers();
      runInAction(() => {
        this.users = users;
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = (err as Error).message;
        this.isLoading = false;
      });
    }
  };
}

export const userStore = new UserStore();
