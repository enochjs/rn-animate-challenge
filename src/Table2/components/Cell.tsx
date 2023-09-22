import React, { memo, useMemo } from 'react';
import { isEqual } from 'lodash';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { IDefaultData, ITableCellProps } from '../interface';

function Cell<T extends IDefaultData>(props: ITableCellProps<T>) {
  const {
    render,
    data,
    dataIndex,
    textStyle,
    width,
    height,
    flex,
    style,
    rowIndex,
    bordered,
    borderStyle,
    borderedRight = true,
  } = props;

  const composedStyles = useMemo(() => {
    const styles: ViewStyle = {};
    if (width) {
      styles.width = width;
    }
    if (height) {
      styles.height = height;
    }
    if (flex) {
      styles.flex = flex;
    }
    if (!width && !flex && !height && !style) {
      styles.flex = 1;
    }
    return styles;
  }, [width, height, flex, style]);

  const borderTopWidth = bordered ? borderStyle?.borderWidth ?? 1 : 0;
  const borderRightWidth = bordered && borderedRight !== false ? borderTopWidth : 0;
  const borderColor = borderStyle?.borderColor;

  return (
    <View
      className="p-2"
      style={[
        {
          borderTopWidth,
          borderRightWidth,
          borderColor,
        },
        styles.cell,
        composedStyles,
        style,
      ]}
    >
      {render ? (
        render(data?.[dataIndex], data, rowIndex)
      ) : (
        <Text style={textStyle}>{(data?.[dataIndex] as string) || '-'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cell: { justifyContent: 'center', alignItems: 'center' },
  text: { backgroundColor: 'transparent' },
});

export default memo(Cell, (pre, next) =>
  next.render
    ? isEqual(pre.data, next.data)
    : pre.data[pre.dataIndex] === next.data[next.dataIndex] && pre.height === next.height
);
