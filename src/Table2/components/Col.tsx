import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import Cell from './Cell';
import { IDefaultData, ITableColProps } from '../interface';

export default function Col<T extends IDefaultData>(props: ITableColProps<T>) {
  const { width, style, data, flex, column, heightArr } = props;

  const composedStyle = useMemo(() => {
    const styles: ViewStyle = {};
    if (width) {
      styles.width = width;
    }
    if (flex) {
      styles.flex = flex;
    }
    return styles;
  }, [width]);

  const getRowHeight = (rowIndex: number, rowSpan: number = 1) => {
    // 存在合并单元格
    if (column.rowSpanKey) {
      let count = 0;
      let height = 0;
      while (count < rowSpan) {
        height += heightArr?.[rowIndex + count] || 0;
        count += 1;
      }
      return height;
    } else {
      return heightArr?.[rowIndex];
    }
  };

  const colData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      height: getRowHeight(index, item[column.rowSpanKey!] as number),
    }));
  }, [data]);

  return (
    <View style={[composedStyle, style]}>
      {colData
        .filter((item) => item.height !== 0)
        .map((item, i) => {
          return (
            <Cell
              key={i}
              data={item}
              dataIndex={column.dataIndex as string}
              width={width}
              height={item.height || column.height}
              flex={flex}
              rowIndex={i}
              textStyle={column.cellTextStyle}
              render={column.render as any}
            />
          );
        })}
    </View>
  );
}
