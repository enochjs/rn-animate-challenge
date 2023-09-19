import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, SafeAreaView, NativeSyntheticEvent, NativeScrollEvent, LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, useWorkletCallback } from 'react-native-reanimated';

const HEADER_HEIGHT = 56;

export default function Table() {
  const data = [
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5:
        'name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
    {
      name1: 'name1',
      name2: 'name2',
      name3: 'name3',
      name4: 'name4',
      name5: 'name5',
      name6: 'name6',
      name7: 'name7',
      name8: 'name8',
      name9: 'name9',
      name10: 'name10',
      name11: 'name11',
      name12: 'name12',
      name13: 'name13',
      name14: 'name14',
      name15: 'name15',
      name16: 'name16',
    },
  ];

  const [opacity, setOpacity] = useState(0);

  const scrollY = useSharedValue(0);

  const columns = Array.from({ length: 16 }).map((item, index) => ({
    title: `name${index + 1}`,
    dataIndex: `name${index + 1}`,
    width: 80 + index * 10,
  }));

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 300);
  }, []);

  const handleScrollVertical = useWorkletCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  }, []);

  const heightRef = useRef<number[]>([]);

  const animatedYStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -scrollY.value }],
  }));

  const animatedFixedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value < 0 ? -scrollY.value : 0 }],
  }));

  const handleLayout = useCallback((event: LayoutChangeEvent, index: number) => {
    heightRef.current[index] = event.nativeEvent.layout.height;
  }, []);

  return (
    <SafeAreaView>
      <View className=" relative" style={{ position: 'relative', height: 300, overflow: 'hidden', opacity }}>
        <ScrollView horizontal showsVerticalScrollIndicator={false} style={{ position: 'relative', zIndex: 1 }}>
          <View style={{ position: 'relative', zIndex: 100 }}>
            <ScrollView onScroll={handleScrollVertical} stickyHeaderIndices={[0]} scrollEventThrottle={16}>
              <View className="flex-row bg-pink-200">
                {columns.map((c) => (
                  <View key={c.dataIndex} style={{ width: c.width, height: 56 }}>
                    <Text>{c.title}</Text>
                  </View>
                ))}
              </View>
              {data.map((item: any, index) => (
                <View key={index.toString()} className="flex-row bg-white" onLayout={(e) => handleLayout(e, index)}>
                  {columns.map((c) => (
                    <View key={c.dataIndex} style={{ width: c.width }}>
                      <Text numberOfLines={3}>{item[c.dataIndex]}</Text>
                    </View>
                  ))}
                </View>
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
    </SafeAreaView>
  );
}
