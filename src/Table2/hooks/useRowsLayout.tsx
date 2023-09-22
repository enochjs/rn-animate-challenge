import { useCallback, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

// 使用prerender 获取到每一行的高度
export default function useRowsLayout(data: any[]) {
  const heightRef = useRef<number[]>([]);
  const [heightArr, setHeightArr] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    heightRef.current = [];
    setLoading(true);
  }, [data]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent, index: number) => {
      heightRef.current[index] = event.nativeEvent.layout.height;

      if (heightRef.current.filter((item) => item).length === data.length) {
        setHeightArr([...heightRef.current]);
        setLoading(false);
      }
    },
    [data]
  );

  return {
    heightArr,
    handleLayout,
    loading,
  };
}
