'use client';

import { SortDropdown } from '../SortDropdown';
import type { SortField } from '@/types/sort';
import styles from './SortPanel.module.css';

const fields: { field: SortField; label: string }[] = [
  { field: 'lastName', label: 'Фамилия' },
  { field: 'age', label: 'Возраст' },
  { field: 'gender', label: 'Пол' },
  { field: 'phone', label: 'Телефон' },
];

export default function SortPanel() {
  return (
    <div className={styles.panel}>
      {fields.map(({ field, label }) => (
        <SortDropdown key={field} field={field} label={label} />
      ))}
    </div>
  );
}
