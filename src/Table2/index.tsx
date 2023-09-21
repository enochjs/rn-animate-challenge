import { View, useWindowDimensions } from 'react-native';
import TableCom from './components/Table';
import PreRender from './components/PreRenderTable';
import useRowsLayout from './hooks/useRowsLayout';
import { useMemo } from 'react';
import { IDefaultData, ITableProps } from './interface';

export default function Table<T extends IDefaultData>(props: ITableProps<T>) {
  const { data, columns, tableStyle } = props;

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

  return (
    <View style={tableStyle}>
      {loading ? (
        <PreRender onLayout={handleLayout} data={data} columns={columns} widthArr={widthArr} flexArr={flexArr} />
      ) : (
        <TableCom columns={columns} data={data} heightArr={heightArr} />
      )}
    </View>
  );
}
