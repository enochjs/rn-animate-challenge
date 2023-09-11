import { useCallback, useRef } from 'react';
import {
  Gesture,
  type GestureStateChangeEvent,
  type GestureUpdateEvent,
  type PanGestureHandlerEventPayload,
  type PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { clamp } from '../utils/clamp';

import type { ImageZoomUseGesturesProps } from '../types';
import { Dimensions } from 'react-native';

export const useGestures = ({
  center,
  minScale = 1,
  maxScale = 5,
  minPanPointers = 2,
  maxPanPointers = 2,
  isPanEnabled = true,
  isPinchEnabled = true,
  onInteractionStart,
  onInteractionEnd,
  onPinchStart,
  onPinchEnd,
  onPanStart,
  onPanEnd,
  autoReset,
  width = Dimensions.get('window').width,
  height = Dimensions.get('window').height,
  horizontalOuterRangeOffset,
}: ImageZoomUseGesturesProps) => {
  const isInteracting = useRef(false);
  const isPanning = useRef(false);
  const isPinching = useRef(false);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const initialFocal = { x: useSharedValue(0), y: useSharedValue(0) };
  const translate = { x: useSharedValue(0), y: useSharedValue(0) };
  const savedTranslate = { x: useSharedValue(0), y: useSharedValue(0) };

  const reset = useCallback(() => {
    'worklet';
    savedScale.value = 1;
    scale.value = withTiming(1);
    translate.x.value = withTiming(0);
    translate.y.value = withTiming(0);
  }, [scale, translate.x, translate.y]);

  const onInteractionStarted = () => {
    if (!isInteracting.current) {
      isInteracting.current = true;
      onInteractionStart?.();
    }
  };

  const onInteractionEnded = () => {
    if (isInteracting.current && !isPinching.current && !isPanning.current) {
      if (autoReset) {
        reset();
      }
      isInteracting.current = false;
      onInteractionEnd?.();
    }
  };

  const onPinchStarted = () => {
    onInteractionStarted();
    isPinching.current = true;
    onPinchStart?.();
  };

  const onPinchEnded = () => {
    isPinching.current = false;
    onPinchEnd?.();
    onInteractionEnded();
  };

  const onPanStarted = () => {
    onInteractionStarted();
    isPanning.current = true;
    onPanStart?.();
  };

  const onPanEnded = () => {
    isPanning.current = false;
    onPanEnd?.();
    onInteractionEnded();
  };

  const panGesture = Gesture.Pan()
    .enabled(isPanEnabled)
    .minPointers(minPanPointers)
    .maxPointers(maxPanPointers)
    .onStart(() => {
      runOnJS(onPanStarted)();
    })
    .onUpdate((event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      // if (scale.value <= 1) {
      //   return;
      // }
      const tempX = savedTranslate.x.value + event.translationX;
      const tempY = savedTranslate.y.value + event.translationY;
      translate.x.value = savedTranslate.x.value + event.translationX;
      translate.y.value = savedTranslate.y.value + event.translationY;

      const maxX = (width * scale.value - width) / 2;
      const maxY = (height * scale.value - height) / 2;

      console.log('---horizontalOuterRangeOffset', horizontalOuterRangeOffset);

      // if (Math.abs(tempX) > maxX) {
      //   console.log('====come in');
      //   // scroll to next
      //   horizontalOuterRangeOffset(tempX < 0 ? tempX + maxX : tempX - maxX);
      // }

      if (Math.abs(tempX) <= maxX) {
        translate.x.value = tempX;
      } else {
        translate.x.value = tempX < 0 ? -1 * maxX : maxX;
      }
      if (Math.abs(tempY) <= (height * scale.value - height) / 2) {
        translate.y.value = tempY;
      } else {
        translate.y.value = tempY < 0 ? -1 * maxY : maxY;
      }
    })
    .onEnd(() => {
      runOnJS(onPanEnded)();

      savedTranslate.x.value = translate.x.value;
      savedTranslate.y.value = translate.y.value;
    });

  const pinchGesture = Gesture.Pinch()
    .enabled(isPinchEnabled)
    .onStart((event: GestureStateChangeEvent<PinchGestureHandlerEventPayload>) => {
      runOnJS(onPinchStarted)();
      initialFocal.x.value = event.focalX;
      initialFocal.y.value = event.focalY;
    })
    .onUpdate((event: GestureUpdateEvent<PinchGestureHandlerEventPayload>) => {
      scale.value = clamp(event.scale * savedScale.value, minScale, maxScale);
    })
    .onEnd(() => {
      runOnJS(onPinchEnded)();
      if (scale.value < 1) {
        reset();
      } else {
        savedScale.value = scale.value;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.x.value }, { translateY: translate.y.value }, { scale: scale.value }],
  }));

  const gestures = Gesture.Simultaneous(pinchGesture, panGesture);

  return { gestures, animatedStyle };
};
