import React, { ReactNode, memo, useMemo } from 'react';
import { isEqual } from 'lodash';
import { View, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';

interface CellProps<T = any> {
  data: T;
  dataIndex: string;
  width?: number;
  height?: number;
  flex?: number;
  index: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  borderStyle?: {
    borderColor?: string;
    borderWidth?: number;
  };
  render?: (text: any, data: T, index: number) => ReactNode;
}

function Cell(props: CellProps) {
  const { render, data, dataIndex, textStyle, width, height, flex, style, index } = props;

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

  return (
    <View className=" border-pink-100 border-2" style={[styles.cell, composedStyles, style]}>
      {render ? render(data?.[dataIndex], data, index) : <Text style={textStyle}>{data?.[dataIndex] || '-'}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  cell: { justifyContent: 'center' },
  text: { backgroundColor: 'transparent' },
});

export default memo(Cell, (pre, next) =>
  next.render ? isEqual(pre.data, next.data) : pre.data[pre.dataIndex] === next.data[next.dataIndex] && pre.height === next.height
);
