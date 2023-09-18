import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function RotationGesture() {
  const rotation = useSharedValue(1);

  const rotationGesture = Gesture.Rotation()
    .onBegin(() => {
      console.log('===> begin');
    })
    .onStart((e) => {
      console.log('=====on start');
    })
    .onUpdate((e) => {
      rotation.value = e.rotation;
    })
    .onEnd(() => {
      rotation.value = withTiming(1, { duration: 300 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${(rotation.value / Math.PI) * 180}deg` }],
  }));

  return (
    <GestureHandlerRootView className=" flex-1 items-center justify-center">
      <GestureDetector gesture={rotationGesture}>
        <Animated.View className="w-64 h-64 bg-pink-400 rounded-2xl" style={animatedStyle} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
