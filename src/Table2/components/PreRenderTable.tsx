import { View } from 'react-native';
import Row from './Row';
import { IPreRenderTableProps } from '../interface';

// 通过预渲染获取每一行的高度，表哥列固定时，需要根据获得的高度进行渲染
export default function PreRender<T>(props: IPreRenderTableProps<T>) {
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
