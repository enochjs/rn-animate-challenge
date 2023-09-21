import { View, useWindowDimensions } from 'react-native';
import TableCom from './components/Table';
import PreRender from './components/PreRenderTable';
import useRowsLayout from './hooks/useRowsLayout';
import { useMemo } from 'react';
import { IDefaultData, ITableProps } from './interface';
import useColumns from './hooks/useColumns';

export default function Table<T extends IDefaultData>(props: ITableProps<T>) {
  const { data, columns, tableStyle, rowHeight } = props;

  const { leftColumns, sortedColumns, rightColumns, hasRowSpan } = useColumns(columns);

  const { heightArr, handleLayout, loading } = useRowsLayout(data.length);

  const dimensions = useWindowDimensions();

  const viewWidth = dimensions.width;

  const { widthArr, flexArr } = useMemo(() => {
    let totalWidth = 0;
    const widthArr: number[] = [];
    columns.forEach((c) => {
      totalWidth += c.width;
      widthArr.push(c.width);
    });
    return {
      rowWidth: totalWidth < viewWidth ? viewWidth : totalWidth,
      widthArr: totalWidth < viewWidth ? undefined : widthArr,
      flexArr: totalWidth < viewWidth ? widthArr : undefined,
    };
  }, [columns, viewWidth]);

  if (rowHeight) {
    return (
      <TableCom
        columns={sortedColumns}
        data={data}
        heightArr={new Array(data.length).fill(rowHeight)}
        leftColumns={leftColumns}
        rightColumns={rightColumns}
      />
    );
  }

  // 有固定列和合并单元格则需要preRender 获取行高
  if (leftColumns.length || rightColumns.length || hasRowSpan) {
    return (
      <View style={tableStyle}>
        {loading ? (
          <PreRender onLayout={handleLayout} data={data} columns={columns} widthArr={widthArr} flexArr={flexArr} />
        ) : (
          <TableCom columns={sortedColumns} data={data} heightArr={heightArr} leftColumns={leftColumns} rightColumns={rightColumns} />
        )}
      </View>
    );
  }

  return (
    <View style={tableStyle}>
      <TableCom columns={columns} data={data} />
    </View>
  );
}
