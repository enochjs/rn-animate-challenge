import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import Cell from './Cell';
import { sum } from '../utils';
import { IDefaultData, ITableRowProps } from '../interface';

export default function Row<T extends IDefaultData>(props: ITableRowProps<T>) {
  const { width, widthArr, height, style, data, flexArr, columns, ...restProps } = props;

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
            key={item.dataIndex as string}
            data={data}
            rowIndex={i}
            dataIndex={item.dataIndex as string}
            width={wth}
            height={height}
            flex={flex}
            textStyle={item.cellTextStyle}
            render={item.render as any}
            {...restProps}
            borderedRight={i !== columns.length - 1}
          />
        );
      })}
    </View>
  );
}
