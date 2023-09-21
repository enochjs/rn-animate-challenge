import { ScrollView, View, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent, useWindowDimensions } from 'react-native';
import { useSharedValue, useWorkletCallback } from 'react-native-reanimated';
import Header from './Header';
import { useCallback, useMemo, useState } from 'react';
import Row from './Row';
import Col from './Col';
import { IDefaultData, IRenderTableProps } from '../interface';
import FixedColumns from './FixedColumns';
import FixedHeader from './FixedHeader';

const HEADER_HEIGHT = 56;

export default function Table<T extends IDefaultData>(props: IRenderTableProps<T>) {
  const { data, columns, heightArr, leftColumns, rightColumns } = props;

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
            <Col key={item.dataIndex as string} column={item} width={widthArr?.[index]} flex={flexArr?.[index]} data={data} heightArr={heightArr} />
          ))}
        </View>
      );
    }
    return (
      <>
        {data.map((item: any, index) => (
          <Row key={index} data={item} columns={columns} width={rowWidth} widthArr={widthArr} flexArr={flexArr} />
        ))}
      </>
    );
  };

  const renderFixed = () => {
    if (widthArr && heightArr) {
      console.log('====lefr', leftColumns, rightColumns);
      return (
        <>
          {leftColumns?.length ? (
            <>
              <FixedHeader columns={leftColumns} widthArr={widthArr} heightArr={heightArr} height={HEADER_HEIGHT} scrollY={scrollY} />
              <FixedColumns columns={leftColumns} data={data} widthArr={widthArr} heightArr={heightArr} top={HEADER_HEIGHT} scrollY={scrollY} />
            </>
          ) : null}
          {rightColumns?.length ? (
            <>
              <FixedHeader columns={rightColumns} widthArr={widthArr} heightArr={heightArr} height={HEADER_HEIGHT} scrollY={scrollY} fixed="right" />
              <FixedColumns
                columns={rightColumns}
                data={data}
                widthArr={widthArr}
                heightArr={heightArr}
                top={HEADER_HEIGHT}
                scrollY={scrollY}
                fixed="right"
              />
            </>
          ) : null}
        </>
      );
    }
    return null;
  };

  return (
    <View className="relative h-80 overflow-hidden bg-white" onLayout={handleLayout}>
      <ScrollView horizontal showsVerticalScrollIndicator={false} style={{ position: 'relative', zIndex: 1 }}>
        <View style={{ position: 'relative', zIndex: 100 }}>
          <ScrollView onScroll={handleScrollVertical} stickyHeaderIndices={[0]} scrollEventThrottle={16}>
            <Header
              columns={columns}
              width={rowWidth}
              widthArr={widthArr}
              flexArr={flexArr}
              height={HEADER_HEIGHT}
              style={{ backgroundColor: 'red' }}
            />
            {renderContent()}
          </ScrollView>
        </View>
      </ScrollView>
      {renderFixed()}
    </View>
  );
}
