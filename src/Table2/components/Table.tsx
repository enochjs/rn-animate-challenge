import { ScrollView, View, Text, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, useWorkletCallback } from 'react-native-reanimated';
import Header from './Header';
import { useCallback, useMemo, useState } from 'react';
import Row from './Row';
import Col from './Col';
import { IDefaultData, IRenderTableProps } from '../interface';

const HEADER_HEIGHT = 56;

export default function Table<T extends IDefaultData>(props: IRenderTableProps<T>) {
  const { data, columns, heightArr } = props;

  const dimensions = useWindowDimensions();

  const [viewWidth, setViewWidth] = useState(dimensions.width);

  const scrollY = useSharedValue(0);

  const hasRowSpan = useMemo(() => {
    const rowSpanKeys = columns.filter((item) => item.rowSpanKey);
    return rowSpanKeys.length;
  }, [columns]);

  const handleScrollVertical = useWorkletCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  }, []);

  const animatedYStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -scrollY.value }],
  }));

  const animatedFixedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value < 0 ? -scrollY.value : 0 }],
  }));

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
    if (hasRowSpan) {
      return (
        <View className="flex-row">
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
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: columns[0].width,
            height: HEADER_HEIGHT,
            backgroundColor: '#fff',
            zIndex: 10,
          },
          animatedFixedStyle,
        ]}
      >
        <Text>序号1233</Text>
      </Animated.View>
      <View
        style={[
          { position: 'absolute', overflow: 'hidden', backgroundColor: 'white', left: 0, top: HEADER_HEIGHT, width: columns[0].width, zIndex: 1 },
        ]}
      >
        <Animated.View style={[animatedYStyle]}>
          <View className="flex-row">
            {columns.slice(0, 2).map((c, index) => (
              <Col
                key={c.dataIndex as string}
                column={c as any}
                width={widthArr?.[index]}
                flex={flexArr?.[index]}
                data={data}
                heightArr={heightArr}
              />
            ))}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
