import { Text } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { IFixedHeaderProps } from '../interface';
import { useMemo } from 'react';
import Cell from './Cell';

export default function FixedHeader(props: IFixedHeaderProps) {
  const { columns, scrollY, fixed = 'left', flexArr, widthArr, height } = props;

  const animatedYStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value < 0 ? -scrollY.value : 0 }],
  }));

  const width = useMemo(() => {
    return columns.reduce((pre, cur) => pre + cur.width, 0);
  }, [columns]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: width,
          height: height,
          backgroundColor: '#fff',
          zIndex: 10,
          left: fixed === 'left' ? 0 : undefined,
          right: fixed === 'right' ? 0 : undefined,
          flexDirection: 'row',
        },
        animatedYStyle,
      ]}
    >
      {columns.map((item, i) => {
        const flex = flexArr?.[i];
        const wth = widthArr?.[i];
        return (
          <Cell
            key={item.dataIndex as string}
            data={item}
            rowIndex={i}
            dataIndex={item.dataIndex as string}
            width={wth}
            height={height}
            flex={flex}
            textStyle={item.cellTextStyle}
            render={() => <Text>{item.title}</Text>}
          />
        );
      })}
    </Animated.View>
  );
}
