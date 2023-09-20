import React, { useMemo } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import Cell from './Cell';

interface RowProps<T = any> {
  data: T[];
  style?: StyleProp<ViewStyle>;
  width?: number;
  flex?: number;
  column: any;
  heightRef?: React.RefObject<number[]>;
  rowSpanKey?: string;
}

export default function Col(props: RowProps) {
  const { width, style, data, flex, column, heightRef } = props;

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
        height += heightRef?.current?.[rowIndex + count] || 0;
        count += 1;
      }

      return height;
    } else {
      return heightRef?.current?.[rowIndex];
    }
  };

  const colData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      height: getRowHeight(index, item.rowSpan),
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
              index={i}
              dataIndex={column.dataIndex}
              width={width}
              height={item.height || column.height}
              flex={flex}
              textStyle={column.textStyle}
              render={column.render}
            />
          );
        })}
    </View>
  );
}
