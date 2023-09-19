import { ScrollView, View, Text, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, useWorkletCallback } from 'react-native-reanimated';
import Header from './Header';
import { useCallback, useMemo, useState } from 'react';
import Row from './Row';

const HEADER_HEIGHT = 56;

interface ITableProps<T = any> {
  data: T[];
  columns: any[];
  heightRef: React.RefObject<number[]>;
}

export default function Table(props: ITableProps) {
  const { data, columns, heightRef } = props;

  const dimensions = useWindowDimensions();

  const [viewWidth, setViewWidth] = useState(dimensions.width);

  const scrollY = useSharedValue(0);

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
            {data.map((item: any, index) => (
              <Row key={index} data={item} columns={columns} width={rowWidth} widthArr={widthArr} flexArr={flexArr} />
            ))}
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
          {data.map((item: any, index) => (
            <View key={index.toString()} className="flex-row">
              {columns.slice(0, 2).map((c) => (
                <View key={c.dataIndex} style={{ width: c.width, height: heightRef.current?.[index] }}>
                  <Text>{item[c.dataIndex]}</Text>
                </View>
              ))}
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}
