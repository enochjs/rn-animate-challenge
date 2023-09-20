import { useCallback } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function WithTiming2() {
  const start = 25;
  const offset = useSharedValue(start);
  const width = useWindowDimensions().width;

  const handlePress = useCallback(
    (index: number) => {
      // todo
      offset.value = (index * width) / 3 + start;
      console.log('====index', index, offset.value);
    },
    [width]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(offset.value, { duration: 300 }),
      },
    ],
  }));

  return (
    <View className="flex-1 justify-center">
      <View>
        <View className="flex-row justify-around">
          <TouchableOpacity className="flex-1 justify-center items-center" onPress={() => handlePress(0)}>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 justify-center items-center" onPress={() => handlePress(1)}>
            <Text>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 justify-center items-center" onPress={() => handlePress(2)}>
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
        <Animated.View className="bg-pink-400 h-3 w-20 rounded-2xl mt-1" style={animatedStyle} />
      </View>
    </View>
  );
}
