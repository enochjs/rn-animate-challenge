import { ScrollView, View, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent, useWindowDimensions } from 'react-native';
import { useSharedValue, useWorkletCallback } from 'react-native-reanimated';
import Header from './Header';
import { useCallback, useMemo, useState } from 'react';
import Row from './Row';
import Col from './Col';
import { IDefaultData, IRenderTableProps } from '../interface';
import FixedColumns from './FixedColumns';
import FixedHeader from './FixedHeader';

const HEADER_HEIGHT = 36;

export default function Table<T extends IDefaultData>(props: IRenderTableProps<T>) {
  const {
    data,
    columns,
    heightArr,
    leftColumns,
    rightColumns,
    headerStyle,
    borderStyle,
    bordered,
    tableStyle,
    headerLeftColumns,
    headerRightColumns,
    headerColumns,
    maxLevelDeep,
  } = props;

  const dimensions = useWindowDimensions();

  const [viewWidth, setViewWidth] = useState(dimensions.width);

  const scrollY = useSharedValue(0);

  const handleScrollVertical = useWorkletCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  }, []);

  const { rowWidth, widthArr, flexArr } = useMemo(() => {
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

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setViewWidth(e.nativeEvent.layout.width);
  }, []);

  const renderContent = () => {
    if (heightArr) {
      return (
        <View className="flex-row" style={{ width: rowWidth }}>
          {columns.map((item, index) => (
            <Col
              key={item.dataIndex as string}
              column={item}
              width={widthArr?.[index]}
              flex={flexArr?.[index]}
              data={data}
              heightArr={heightArr}
              bordered={bordered}
              borderedRight={index !== columns.length - 1}
              borderStyle={borderStyle}
            />
          ))}
        </View>
      );
    }
    return (
      <>
        {data.map((item: any, index) => (
          <Row
            key={index}
            data={item}
            columns={columns}
            width={rowWidth}
            widthArr={widthArr}
            flexArr={flexArr}
            bordered={bordered}
            borderStyle={borderStyle}
          />
        ))}
      </>
    );
  };

  const renderFixed = () => {
    if (widthArr && heightArr) {
      return (
        <>
          {leftColumns?.length && headerLeftColumns?.length ? (
            <>
              <FixedHeader
                columns={headerLeftColumns}
                widthArr={widthArr}
                heightArr={heightArr}
                height={HEADER_HEIGHT}
                scrollY={scrollY}
                style={headerStyle}
                bordered={bordered}
                borderStyle={borderStyle}
                maxLevelDeep={maxLevelDeep}
              />
              <FixedColumns
                columns={leftColumns}
                data={data}
                widthArr={widthArr}
                heightArr={heightArr}
                top={HEADER_HEIGHT}
                scrollY={scrollY}
                bordered={bordered}
                borderStyle={borderStyle}
              />
            </>
          ) : null}
          {rightColumns?.length && headerRightColumns?.length ? (
            <>
              <FixedHeader
                columns={headerRightColumns}
                widthArr={widthArr}
                heightArr={heightArr}
                height={HEADER_HEIGHT}
                scrollY={scrollY}
                fixed="right"
                style={headerStyle}
                bordered={bordered}
                borderStyle={borderStyle}
                maxLevelDeep={maxLevelDeep}
              />
              <FixedColumns
                columns={rightColumns}
                data={data}
                widthArr={widthArr}
                heightArr={heightArr}
                top={HEADER_HEIGHT}
                scrollY={scrollY}
                fixed="right"
                bordered={bordered}
                borderStyle={borderStyle}
              />
            </>
          ) : null}
        </>
      );
    }
    return null;
  };

  return (
    <View
      className="relative bg-white"
      onLayout={handleLayout}
      style={[
        borderStyle,
        {
          borderRadius: 16,
          overflow: 'hidden',
        },
        tableStyle,
      ]}
    >
      <ScrollView horizontal showsVerticalScrollIndicator={false} style={{ position: 'relative', zIndex: 1 }}>
        <View style={{ position: 'relative', zIndex: 100 }}>
          <ScrollView onScroll={handleScrollVertical} stickyHeaderIndices={[0]} scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
            <Header
              columns={headerColumns || columns}
              width={rowWidth}
              widthArr={widthArr}
              flexArr={flexArr}
              height={HEADER_HEIGHT}
              style={headerStyle}
              bordered={bordered}
              borderStyle={borderStyle}
              maxLevelDeep={maxLevelDeep}
            />
            {renderContent()}
          </ScrollView>
        </View>
      </ScrollView>
      {/* {renderFixed()} */}
    </View>
  );
}
