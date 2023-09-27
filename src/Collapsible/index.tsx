import { ReactNode, useCallback, useState } from 'react';
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface ICollapsible {
  children: ReactNode;
  expand?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Collapsible(props: ICollapsible) {
  const { children, expand, style } = props;

  const [height, setHeight] = useState(0);

  const animatedHeight = useSharedValue(0);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    animatedHeight.value = expand ? withTiming(height) : withTiming(0);
    return {
      height: animatedHeight.value,
    };
  });

  return (
    <Animated.View className="w-full" style={[{ overflow: 'hidden', position: 'relative' }, animatedStyle, style]}>
      <View style={{ position: 'absolute', top: 0 }} onLayout={handleLayout}>
        {children}
      </View>
    </Animated.View>
  );
}
