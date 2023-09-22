import { useMemo } from 'react';

export default function useColumns<T>(columns: T[]) {
  const { leftColumns, sortedColumns, rightColumns, hasRowSpan } = useMemo(() => {
    const leftColumns: T[] = [];
    const rightColumns: T[] = [];
    const otherColumns: T[] = [];
    let hasRowSpan = false;

    columns.forEach((c: any) => {
      if (c.rowSpanKey) {
        hasRowSpan = true;
      }
      if (c.fixed === 'left') {
        leftColumns.push(c);
      } else if (c.fixed === 'right') {
        rightColumns.push(c);
      } else {
        otherColumns.push(c);
      }
    });
    return { leftColumns, sortedColumns: [...leftColumns, ...otherColumns, ...rightColumns], rightColumns, hasRowSpan };
  }, [columns]);

  return {
    leftColumns,
    sortedColumns,
    rightColumns,
    hasRowSpan,
  };
}
