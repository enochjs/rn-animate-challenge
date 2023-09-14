import { useMemo } from 'react';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function PanGesture() {
  const END_POSITION = 200;
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);

  const gesture = useMemo(() => {
    return Gesture.Pan()
      .onBegin((e) => {})
      .onUpdate((e) => {
        if (onLeft.value) {
          position.value = e.translationX;
        } else {
          position.value = END_POSITION + e.translationX;
        }
      })
      .onEnd((e) => {
        if (position.value < END_POSITION / 2) {
          position.value = withTiming(0, { duration: 300 });
          onLeft.value = true;
        } else {
          position.value = withTiming(END_POSITION, { duration: 300 });
          onLeft.value = false;
        }
      });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: position.value,
      },
    ],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[{ width: 100, height: 100, backgroundColor: 'pink' }, animatedStyle]}></Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
