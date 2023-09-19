import { useCallback, useRef, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export function useRowLayout(length: number) {
  const heightRef = useRef<number[]>([]);
  const [update, setUpdate] = useState(0);

  const handleLayout = useCallback((event: LayoutChangeEvent, index: number) => {
    heightRef.current[index] = event.nativeEvent.layout.height;

    if (heightRef.current.filter((item) => item).length === length) {
      setUpdate(update + 1);
    }
  }, []);

  return {
    heightRef,
    handleLayout,
  };
}
