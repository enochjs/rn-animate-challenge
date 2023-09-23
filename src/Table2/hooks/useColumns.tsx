import { useMemo } from 'react';
import { IColumn } from '../interface';

const formatColumnAndGetLevelDeep = (column: IColumn) => {
  let levelDeep = 1;
  const computedColumns: IColumn[] = [];

  const help = (column: IColumn, level: number) => {
    if (column.children?.length) {
      let width = 0;
      column.children.forEach((item) => {
        levelDeep = Math.max(levelDeep, level + 1);
        item.fixed = column.fixed;
        const _item = help(item, level + 1);
        width += _item.width;
      });
      column.width = width;
    } else {
      // 获取最后一行列配置
      computedColumns.push(column);
    }
    return column;
  };
  help(column, levelDeep);

  return { column, computedColumns, levelDeep };
};

export default function useColumns<T extends IColumn>(columns: T[]) {
  const memoResult = useMemo(() => {
    const leftColumns: T[] = [];
    const rightColumns: T[] = [];
    const otherColumns: T[] = [];
    const headerLeftColumns: T[] = [];
    const headerRightColumns: T[] = [];
    const headerOtherColumns: T[] = [];
    let hasRowSpan = false;
    let maxLevelDeep = 0;
    columns.forEach((c) => {
      const { column, computedColumns, levelDeep }: any = formatColumnAndGetLevelDeep(c);

      maxLevelDeep = Math.max(maxLevelDeep, levelDeep);
      if (c.rowSpanKey) {
        hasRowSpan = true;
      }
      if (column.fixed === 'left') {
        headerLeftColumns.push(column);
        leftColumns.push(...computedColumns);
      } else if (column.fixed === 'right') {
        headerRightColumns.push(column);
        rightColumns.push(...computedColumns);
      } else {
        headerOtherColumns.push(column);
        otherColumns.push(...computedColumns);
      }
    });
    return {
      leftColumns,
      sortedColumns: [...leftColumns, ...otherColumns, ...rightColumns],
      rightColumns,
      hasRowSpan,
      headerLeftColumns,
      headerRightColumns,
      headerColumns: [...headerLeftColumns, ...headerOtherColumns, ...headerRightColumns],
      maxLevelDeep,
    };
  }, [columns]);

  return memoResult;
}
