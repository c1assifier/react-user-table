'use client';

import { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnSizingState,
  type Updater,
} from '@tanstack/react-table';

import { userStore } from '@/store/userStore';
import type { User } from '@/types/user';
import styles from './UserTable.module.css';
import UserModal from '../UserModal/UserModal';

export const UserTable = observer(() => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    userStore.loadUsers();
  }, []);

  const handleSizingChange = (updater: Updater<ColumnSizingState>) => {
    setColumnSizing(updater);
  };

  const data = userStore.users;

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      { accessorKey: 'lastName', header: 'Фамилия', enableResizing: true, size: 140, minSize: 50 },
      { accessorKey: 'firstName', header: 'Имя', enableResizing: true, size: 120, minSize: 50 },
      {
        accessorKey: 'maidenName',
        header: 'Отчество',
        enableResizing: true,
        size: 120,
        minSize: 50,
        cell: (info) => info.getValue() || '—',
      },
      { accessorKey: 'age', header: 'Возраст', enableResizing: true, size: 80, minSize: 50 },
      { accessorKey: 'gender', header: 'Пол', enableResizing: true, size: 80, minSize: 50 },
      {
        accessorKey: 'phone',
        header: 'Телефон',
        enableResizing: true,
        size: 160,
        minSize: 50,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableResizing: true,
        size: 200,
        minSize: 50,
        maxSize: 400,
      },
      {
        accessorFn: (row) => row.address.country,
        id: 'country',
        header: 'Страна',
        enableResizing: true,
        size: 120,
        minSize: 100,
      },
      {
        accessorFn: (row) => row.address.city,
        id: 'city',
        header: 'Город',
        enableResizing: true,
        size: 120,
        minSize: 100,
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    state: { sorting, columnSizing },
    onSortingChange: setSorting,
    onColumnSizingChange: handleSizingChange,
    defaultColumn: { minSize: 50 },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (userStore.isLoading) return <p>Загрузка...</p>;
  if (userStore.error) return <p>Ошибка загрузки данных</p>;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => {
                      const resizeHandler = header.getResizeHandler();
                      return (
                        <th
                          key={header.id}
                          style={{
                            width: header.getSize(),
                            minWidth: header.column.columnDef.minSize,
                            position: 'relative',
                          }}
                        >
                          <div className={styles.cellContent}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </div>
                          {header.column.getCanResize() && (
                            <div
                              className={styles.resizer}
                              onMouseDown={resizeHandler}
                              onTouchStart={resizeHandler}
                            />
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} onClick={() => setSelectedUser(row.original)}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedUser && <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </>
  );
});
