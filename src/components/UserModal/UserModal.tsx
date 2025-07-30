'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './UserModal.module.css';
import { IoMdClose } from 'react-icons/io';
import type { User } from '@/types/user';

interface Props {
  user: User;
  onClose: () => void;
}

export default function UserModal({ user, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <IoMdClose size={24} />
        </button>
        <div className={styles.content}>
          <img className={styles.avatar} src={user.image} alt={user.firstName} />
          <div className={styles.info}>
            <h2>
              {user.lastName} {user.firstName} {user.maidenName}
            </h2>
            <p>
              <strong>Возраст:</strong> {user.age}
            </p>
            <p>
              <strong>Телефон:</strong> {user.phone}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Рост:</strong> {user.height} см
            </p>
            <p>
              <strong>Вес:</strong> {user.weight} кг
            </p>
            <p>
              <strong>Адрес:</strong> {user.address.city}, {user.address.street},{' '}
              {user.address.postalCode}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
