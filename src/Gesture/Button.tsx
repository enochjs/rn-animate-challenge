import { View, Text } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';

export default function Button() {
  const onPress = () => console.log('press come in');

  return (
    <GestureHandlerRootView className="flex-1 justify-center items-center">
      <RectButton onPress={onPress}>
        <Text>Foo</Text>
      </RectButton>
      <RectButton onPress={onPress}>
        <View accessible accessibilityRole="button" className=" w-16 h-9 bg-pink-500">
          <Text>Bar</Text>
        </View>
      </RectButton>
    </GestureHandlerRootView>
  );
}
