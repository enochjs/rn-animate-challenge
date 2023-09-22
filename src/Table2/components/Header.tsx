import React, { useMemo } from 'react';
import { View, Text, ViewStyle } from 'react-native';
import Cell from './Cell';
import { sum } from '../utils';
import { IDefaultData, ITableHeaderProps } from '../interface';

export default function Header<T extends IDefaultData>(props: ITableHeaderProps<T>) {
  const { width, widthArr, height, style, flexArr, columns, ...restProps } = props;

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
    <View className="flex-row overflow-hidden bg-standard-1" style={[composedStyle, style]}>
      {columns.map((item, i) => {
        const flex = flexArr?.[i];
        const wth = widthArr?.[i];
        return (
          <Cell
            key={item.dataIndex as string}
            data={item}
            rowIndex={i}
            dataIndex={item.dataIndex as string}
            width={wth}
            height={height}
            flex={flex}
            textStyle={item.cellTextStyle}
            render={() => <Text>{item.title}</Text>}
            {...restProps}
            style={[
              style,
              {
                borderTopWidth: 0,
              },
            ]}
            borderedRight={i !== columns.length - 1}
          />
        );
      })}
    </View>
  );
}
