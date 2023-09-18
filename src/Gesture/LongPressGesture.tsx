import { View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function LongPressGesture() {
  // todo
  const longPressGesture = Gesture.LongPress()
    // 设置点击区域
    .hitSlop(-30)
    .onBegin((e) => {
      console.log('===begin', e.absoluteX);
    })
    .onStart((e) => {
      console.log('====start', e.absoluteX);
    })
    .onEnd((e) => {
      console.log('====end', e.absoluteX);
    });

  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GestureDetector gesture={longPressGesture}>
        <View className=" w-32 h-32 bg-pink-400 rounded-2xl" />
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
