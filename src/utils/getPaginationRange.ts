export function getPaginationRange(current: number, total: number): number[] {
  const range: number[] = [];

  if (total <= 3) {
    for (let i = 1; i <= total; i++) range.push(i);
    return range;
  }

  if (current === 1) return [1, 2, 3];
  if (current === total) return [total - 2, total - 1, total];

  return [current - 1, current, current + 1];
}
