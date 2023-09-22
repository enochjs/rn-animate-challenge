import { SafeAreaView, Text, View } from 'react-native';
import Table from './index';
import { IGetColumns } from './interface';

export default function TableDemo() {
  const data = [
    {
      color: '红色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 3,
    },
    {
      color: '红色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 0,
    },
    {
      color: '红色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 0,
    },
    {
      color: '绿色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 2,
    },
    {
      color: '绿色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 0,
    },
    {
      color: '蓝色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 5,
    },
    {
      color: '蓝色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 0,
    },
    {
      color: '蓝色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 0,
    },
    {
      color: '蓝色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 0,
    },
    {
      color: '蓝色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 0,
    },
  ];

  const columns: IGetColumns<(typeof data)[number]> = [
    {
      width: 100,
      dataIndex: 'color',
      title: '颜色',
      key: 'color',
      rowSpanKey: 'rowSpan',
      fixed: 'left',
    },
    {
      width: 100,
      dataIndex: 'size',
      title: '尺码',
      key: 'size',
      render: (text: any, record, index: number) => (
        <Text>
          {record.size}
          {record.shape}
          {index}
        </Text>
      ),
    },

    {
      width: 100,
      dataIndex: 'sku',
      title: 'SKU',
      key: 'sku',
    },
    {
      width: 100,
      dataIndex: 'num',
      title: '单据数量',
      key: 'num',
    },
    {
      width: 100,
      dataIndex: 'check',
      title: '质检数',
      key: 'check',
    },
  ];

  return (
    <SafeAreaView>
      <View style={{ padding: 12 }}>
        <Table columns={columns} data={data} />
      </View>
    </SafeAreaView>
  );
}
