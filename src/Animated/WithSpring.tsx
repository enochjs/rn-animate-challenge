import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';

export default function WithSpring() {
  // todo

  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value,
      },
    ],
  }));

  useEffect(() => {
    offset.value = withRepeat(withSpring(100, { duration: 2000 }), -1, true);
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View className="w-14 h-14 bg-pink-400 rounded-2xl" style={animatedStyle} />
    </View>
  );
}
