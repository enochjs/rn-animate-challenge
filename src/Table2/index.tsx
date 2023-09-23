import { View, useWindowDimensions } from 'react-native';
import TableCom from './components/Table';
import PreRender from './components/PreRenderTable';
import useRowsLayout from './hooks/useRowsLayout';
import { useMemo } from 'react';
import { IDefaultData, ITableProps } from './interface';
import useColumns from './hooks/useColumns';

export default function Table<T extends IDefaultData>(props: ITableProps<T>) {
  const {
    data,
    columns,
    rowHeight,
    bordered = true,
    borderStyle = {
      borderColor: '#E6E9F4',
      borderWidth: 1,
    },
    ...restProps
  } = props;

  const { leftColumns, sortedColumns, rightColumns, hasRowSpan, headerLeftColumns, headerRightColumns, headerColumns, maxLevelDeep } =
    useColumns(columns);

  console.log('=====headerColumns', headerColumns);

  const { heightArr, handleLayout, loading } = useRowsLayout(data);

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
        headerColumns={headerColumns}
        headerLeftColumns={headerLeftColumns}
        headerRightColumns={headerRightColumns}
        maxLevelDeep={maxLevelDeep}
        {...restProps}
      />
    );
  }

  // 有固定列和合并单元格则需要preRender 获取行高
  if (leftColumns.length || rightColumns.length || hasRowSpan) {
    return (
      <View>
        {loading ? (
          <PreRender
            onLayout={handleLayout}
            data={data}
            columns={columns}
            widthArr={widthArr}
            flexArr={flexArr}
            borderStyle={borderStyle}
            bordered={bordered}
            {...restProps}
          />
        ) : (
          <TableCom
            columns={sortedColumns}
            data={data}
            heightArr={heightArr}
            leftColumns={leftColumns}
            rightColumns={rightColumns}
            borderStyle={borderStyle}
            bordered={bordered}
            headerColumns={headerColumns}
            headerLeftColumns={headerLeftColumns}
            headerRightColumns={headerRightColumns}
            maxLevelDeep={maxLevelDeep}
            {...restProps}
          />
        )}
      </View>
    );
  }

  return (
    <View>
      <TableCom columns={columns} data={data} borderStyle={borderStyle} bordered={bordered} {...restProps} />
    </View>
  );
}
