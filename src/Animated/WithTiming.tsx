import { View } from 'react-native';
import Animated, { useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

export default function WithTiming() {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withRepeat(withTiming(-200, { duration: 1500 }), -1, true),
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
