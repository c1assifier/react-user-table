'use client';

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '@/store/userStore';
import type { SortField } from '@/types/sort';
import styles from './SortDropdown.module.css';
import { FiChevronDown } from 'react-icons/fi';

interface Props {
  field: SortField;
  label: string;
}

const OPTIONS_MAP: Record<string, { value: string; label: string }[]> = {
  gender: [
    { value: 'none', label: 'По умолчанию' },
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
  ],
  default: [
    { value: 'none', label: 'По умолчанию' },
    { value: 'asc', label: 'По возрастанию' },
    { value: 'desc', label: 'По убыванию' },
  ],
};

export const SortDropdown = observer(({ field, label }: Props) => {
  const [open, setOpen] = useState(false);

  const isGender = field === 'gender';
  const options = isGender ? OPTIONS_MAP.gender : OPTIONS_MAP.default;

  const selected = isGender
    ? (userStore.genderFilter ?? 'none')
    : (userStore.getSortOrder(field) ?? 'none');

  const selectedLabel = options.find((o) => o.value === selected)?.label;

  const handleChange = (value: string) => {
    if (isGender) {
      userStore.setGenderFilter(value === 'none' ? null : (value as 'male' | 'female'));
    } else {
      userStore.setSortDirectly(field, value === 'none' ? null : (value as 'asc' | 'desc'));
    }
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <button className={styles.button} onClick={() => setOpen((o) => !o)}>
        {selectedLabel}
        <FiChevronDown className={`${styles.icon} ${open ? styles.open : ''}`} />
      </button>

      {open && (
        <ul className={styles.menu}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={opt.value === selected ? styles.active : ''}
              onClick={() => handleChange(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
