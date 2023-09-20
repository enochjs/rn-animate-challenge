import { View, LayoutChangeEvent } from 'react-native';
import Row from './Row';

interface ITableProps<T = any> {
  data: T[];
  columns: any[];
  onLayout: (event: LayoutChangeEvent, index: number) => void;
  width?: number;
  widthArr?: number[];
  flexArr?: number[];
}

export default function PreRender(props: ITableProps) {
  const { data, columns, onLayout, width, widthArr, flexArr } = props;

  return (
    <View className="absolute h-30 w-full -z-10 overflow-hidden opacity-0">
      {data.map((item: any, index) => (
        <View onLayout={(e) => onLayout(e, index)} key={index}>
          <Row data={item} columns={columns} width={width} widthArr={widthArr} flexArr={flexArr} />
        </View>
      ))}
    </View>
  );
}
