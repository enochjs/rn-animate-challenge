import { View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function PanGesture() {
  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      console.log('==== single');
      // Alert.alert('Single tap!');
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      console.log('===== double tap');
    })
    .numberOfTaps(2);

  // 按顺序为优先级响应，只响应一个 所以需要将doubleTap放前面
  const gesture = Gesture.Exclusive(doubleTap, singleTap);

  return (
    <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GestureDetector gesture={gesture}>
        <View className=" h-14 w-14 bg-slate-600" />
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
