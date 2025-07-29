import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '@/store/userStore';
import styles from './UserTable.module.css';

export const UserTable = observer(() => {
  useEffect(() => {
    userStore.loadUsers();
  }, []);

  if (userStore.isLoading) return <p>Загрузка...</p>;
  if (userStore.error) return <p>Ошибка: {userStore.error}</p>;

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Возраст</th>
            <th>Пол</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Страна</th>
            <th>Город</th>
          </tr>
        </thead>
        <tbody>
          {userStore.users.map((user) => (
            <tr key={user.id}>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.maidenName ? user.maidenName : '—'}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.address.country}</td>
              <td>{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
