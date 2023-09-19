import React, { useMemo } from 'react';
import { View, ViewStyle, StyleProp, Text } from 'react-native';
import Cell from './Cell';
import { sum } from './utils';

interface HeaderProps {
  style?: StyleProp<ViewStyle>;
  width?: number;
  widthArr?: number[];
  height?: number;
  flexArr?: number[];
  columns: any[];
}

export default function Header(props: HeaderProps) {
  const { width, widthArr, height, style, flexArr, columns } = props;

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
            data={item}
            index={i}
            dataIndex={item.dataIndex}
            width={wth}
            height={height}
            flex={flex}
            textStyle={item.textStyle}
            render={() => <Text>{item.title}</Text>}
          />
        );
      })}
    </View>
  );
}
