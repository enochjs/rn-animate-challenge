import { View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import Col from './Col';
import { IDefaultData, IFixedColumnsProps } from '../interface';
import { useMemo } from 'react';

export default function FixedColumns<T extends IDefaultData>(props: IFixedColumnsProps<T>) {
  const { data, columns, heightArr, widthArr, flexArr, scrollY, top, fixed = 'left', ...restProps } = props;

  const animatedYStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -scrollY.value }],
  }));

  const width = useMemo(() => {
    return columns.reduce((pre, cur) => pre + cur.width, 0);
  }, [columns]);

  return (
    <View
      style={[
        {
          position: 'absolute',
          overflow: 'hidden',
          backgroundColor: 'white',
          left: fixed === 'left' ? 0 : undefined,
          right: fixed === 'right' ? 0 : undefined,
          top,
          width: width,
          zIndex: 1,
        },
      ]}
    >
      <Animated.View style={[animatedYStyle]}>
        <View className="flex-row">
          {columns.map((c, index) => (
            <Col
              key={c.dataIndex as string}
              column={c as any}
              width={widthArr?.[index]}
              flex={flexArr?.[index]}
              data={data}
              heightArr={heightArr}
              {...restProps}
            />
          ))}
        </View>
      </Animated.View>
    </View>
  );
}
