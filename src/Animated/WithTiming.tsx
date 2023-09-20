import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export default function WithTiming() {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withRepeat(withTiming(100, { duration: 1500 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value,
      },
    ],
  }));

  return (
    <View className="flex-1 justify-center items-center">
      {/* <View></View> */}
      <Animated.View className={'w-12 h-12 bg-purple-600 rounded-xl'} style={animatedStyle} />
    </View>
  );
}
