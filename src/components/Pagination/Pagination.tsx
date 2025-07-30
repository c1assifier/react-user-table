'use client';

import { observer } from 'mobx-react-lite';
import { userStore } from '@/store/userStore';
import { getPaginationRange } from '@/utils/getPaginationRange';
import styles from './Pagination.module.css';

import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export const Pagination = observer(() => {
  const { currentPage, totalPages, setPage } = userStore;
  const pages = getPaginationRange(currentPage, totalPages);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleClick = (page: number) => {
    if (page !== currentPage) {
      setPage(page);
      scrollTop();
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button onClick={() => handleClick(1)} disabled={currentPage === 1} title="Первая">
        <FaAngleDoubleLeft />
      </button>

      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        title="Назад"
      >
        <IoIosArrowBack />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? styles.active : ''}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="Вперёд"
      >
        <IoIosArrowForward />
      </button>

      <button
        onClick={() => handleClick(totalPages)}
        disabled={currentPage === totalPages}
        title="Последняя"
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
});
