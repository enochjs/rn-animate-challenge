import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withRepeat, withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated';

const duration = 2000;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1);

export default function WithRepeat() {
  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(withTiming(0.5, { duration, easing }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotate.value * 360}deg`,
        },
      ],
    };
  });

  return (
    <GestureHandlerRootView className="flex-1 justify-center items-center">
      <Animated.View className="w-20 h-20 rounded-2xl bg-purple-400" style={animatedStyle}></Animated.View>
    </GestureHandlerRootView>
  );
}
