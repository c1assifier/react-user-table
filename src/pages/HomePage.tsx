'use client';

import { observer } from 'mobx-react-lite';
import { userStore } from '@/store/userStore';
import Container from '@/components/Container/Container';
import SortPanel from '@/components/SortPanel/SortPanel';
import { Pagination } from '@/components/Pagination';
import { UserTable } from '@/components/UserTable';
import styles from './HomePage.module.css';

const HomePage = observer(() => {
  const { error } = userStore;

  return (
    <Container>
      <div className={styles.header}>
        <h1 className={styles.title}>Список пользователей</h1>
        <SortPanel />
      </div>

      {error && (
        <div className={styles.errorBox}>
          <h2>Ошибка загрузки</h2>
          <p>{error}</p>
        </div>
      )}

      <UserTable />
      <Pagination />
    </Container>
  );
});

export default HomePage;
