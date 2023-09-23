import React, { useMemo } from 'react';
import { View, Text, ViewStyle } from 'react-native';
import Cell from './Cell';
import { sum } from '../utils';
import { IColumn, ITableHeaderProps } from '../interface';

export default function Header(props: ITableHeaderProps<any>) {
  const { width, widthArr, height = 36, style, flexArr, columns, maxLevelDeep = 1, ...restProps } = props;

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

  if (maxLevelDeep === 1) {
    return (
      <View className="flex-row overflow-hidden bg-standard-1" style={[composedStyle, style]}>
        {columns.map((item, i) => {
          const flex = flexArr?.[i];
          const wth = widthArr?.[i];
          return (
            <Cell
              key={item.dataIndex as string}
              rowIndex={i}
              dataIndex={item.dataIndex as string}
              width={wth}
              data={item}
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

  const renderColumn = (column: IColumn, index: number, level = 1) => {
    // const flex = flexArr?.[i];
    // const wth = widthArr?.[i];
    return (
      <View>
        <View
          style={{
            width: column.width,
            flex: column.flex,
            height: column.children ? height : height! * (maxLevelDeep - level),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>{column.title}</Text>
          {/* <Cell
            key={column.dataIndex as string}
            rowIndex={index}
            dataIndex={column.dataIndex as string}
            width={column.width}
            data={column}
            height={height}
            flex={column.flex}
            textStyle={column.cellTextStyle}
            render={() => <Text>{column.title}</Text>}
            {...restProps}
            style={[
              style,
              {
                borderTopWidth: 0,
              },
            ]}
            borderedRight={index !== columns.length - 1}
          /> */}
        </View>
        {column.children?.length ? (
          <View className="flex-row items-center justify-center">{column.children.map((c) => renderColumn(c, level + 1))}</View>
        ) : null}
      </View>
    );
  };

  return (
    <View className="flex-row overflow-hidden bg-standard-1" style={[style]}>
      {columns.map((item, index) => renderColumn(item, index))}
    </View>
  );
}
