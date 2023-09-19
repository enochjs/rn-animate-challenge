import React, { useMemo } from 'react';
import { View, ViewStyle, StyleProp, LayoutChangeEvent } from 'react-native';
import Cell from './Cell';
import { sum } from './utils';

interface RowProps<T = any> {
  data: T;
  style?: StyleProp<ViewStyle>;
  width?: number;
  widthArr?: number[];
  height?: number;
  flexArr?: number[];
  columns: any[];
}

export default function Row(props: RowProps) {
  const { width, widthArr, height, style, data, flexArr, columns } = props;

  const composedStyle = useMemo(() => {
    const _width = width ? width : widthArr ? sum(widthArr) : 0;
    const styles: ViewStyle = {};
    if (_width) {
      styles.width = _width;
    }
    if (height) {
      styles.height = height;
    }
    return styles;
  }, [width, widthArr, height]);

  return (
    <View className="flex-row overflow-hidden" style={[composedStyle, style]}>
      {columns.map((item, i) => {
        const flex = flexArr?.[i];
        const wth = widthArr?.[i];
        return (
          <Cell
            key={item.dataIndex}
            data={data}
            index={i}
            dataIndex={item.dataIndex}
            width={wth}
            height={height}
            flex={flex}
            textStyle={item.textStyle}
            render={item.render}
          />
        );
      })}
    </View>
  );
}
