import { useWindowDimensions } from 'react-native';
import { Gesture, GestureHandlerRootView, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withDecay } from 'react-native-reanimated';

export default function WithDecay() {
  const offset = useSharedValue(0);
  const width = useWindowDimensions().width;

  const panGesture = Gesture.Pan()
    .onStart(() => {
      console.log('====start');
    })
    .onChange((e) => {
      offset.value += e.changeX;
    })
    .onFinalize((e) => {
      offset.value = withDecay({
        velocity: e.velocityX,
        clamp: [-(width / 2) + 40, width / 2 - 40],
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value,
      },
    ],
  }));

  return (
    <GestureHandlerRootView className="flex-1 items-center justify-center">
      <GestureDetector gesture={panGesture}>
        <Animated.View className="w-20 h-20 bg-purple-400 rounded-2xl" style={animatedStyle}></Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
