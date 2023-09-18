import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function PinchGesture() {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinch = Gesture.Pinch()
    .onBegin(() => {})
    // .hitSlop({
    //   vertical: 50
    //   horizontal: 50,
    // })
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withTiming(1, { duration: 300 });
        savedScale.value = 1;
      } else {
        savedScale.value = scale.value;
      }
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .onEnd(() => {
      const newValue = scale.value === 1 ? 2 : 1;
      scale.value = withTiming(newValue, { duration: 300 });
      savedScale.value = newValue;
    })
    .numberOfTaps(2);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const gesture = Gesture.Simultaneous(doubleTap, pinch);

  return (
    <GestureHandlerRootView className="flex-1 items-center justify-center">
      <GestureDetector gesture={gesture}>
        <Animated.View className="bg-purple-500 w-40 h-40 rounded-2xl" style={animatedStyle}></Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
