import { Directions, Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function FlingGesture() {
  const position = useSharedValue(0);

  const gesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart((e) => {
      position.value = withTiming(position.value + 10, { duration: 100 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <GestureHandlerRootView className="flex-1 items-center justify-center">
      <GestureDetector gesture={gesture}>
        <Animated.View className="bg-pink-500 w-32 h-32 rounded-xl" style={animatedStyle}></Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
