import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
const initialOffset = 200;
const duration = 800;

export default function WithSequence() {
  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
      ],
    };
  });

  useEffect(() => {
    offset.value = withRepeat(
      withSequence(
        withTiming(-initialOffset, { duration, easing: Easing.cubic }),
        withTiming(0, { duration, easing: Easing.cubic }),
        withTiming(initialOffset, { duration, easing: Easing.cubic })
      ),
      -1,
      true
    );
  }, []);

  return (
    <GestureHandlerRootView className="flex-1 items-center justify-center">
      <Animated.View className="bg-purple-500 rounded-2xl w-20 h-20" style={animatedStyle} />
    </GestureHandlerRootView>
  );
}
