import { useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function WithSpring2() {
  const offset = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value,
      },
    ],
  }));

  const handlePressLeft = useCallback(() => {
    offset.value = withSpring(offset.value - 72, {
      duration: 1000,
    });
  }, []);

  const handlePressRight = useCallback(() => {
    // todo
    offset.value = withSpring(offset.value + 72, {
      duration: 1000,
    });
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View className=" flex-row" style={animatedStyle}>
        <View className=" w-16 h-16 mr-2 rounded-2xl bg-pink-400"></View>
        <View className=" w-16 h-16 mr-2 rounded-2xl bg-yellow-400"></View>
        <View className=" w-16 h-16 mr-2 rounded-2xl bg-blue-400"></View>
        <View className=" w-16 h-16 mr-2 rounded-2xl bg-green-400"></View>
      </Animated.View>
      <View className=" flex-row">
        <TouchableOpacity className="mr-12" onPress={handlePressLeft}>
          <Text>Go Left</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressRight}>
          <Text>Go Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
