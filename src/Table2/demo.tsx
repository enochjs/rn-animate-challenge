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
      color1: 'green',
    },
    {
      color: '红色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 0,
      color1: 'green',
      color11: 'color11',
      color12: 'color12',
      color13: 'color13',
      color14: 'color14',
      color15: 'color15',
      color16: 'color16',
      color17: 'color17',
      color2: 'color2',
      color21: 'color21',
      color221: 'color221',
      color222: 'color222',
      color22: 'color22',
      color23: 'color23',
      color24: 'color24',
      color25: 'color25',
      color3: 'color3',
    },
    {
      color: '绿色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 2,
      color1: 'green',
    },
    {
      color: '绿色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 0,
      color1: 'green',
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
      color1: 'green',
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
      color1: 'green',
    },
    {
      color: '蓝色',
      num: 100,
      check: 80,
      sku: 'sku12345567',
      size: 'L',
      shape: '155/70',
      rowSpan: 0,
      color1: 'green',
    },
  ];

  const columns: IGetColumns<(typeof data)[number]> = [
    {
      width: 100,
      dataIndex: 'size',
      title: '尺码',
      key: 'size',
      fixed: 'left',
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
      dataIndex: 'color',
      title: '颜色',
      key: 'color',
      rowSpanKey: 'rowSpan',
      children: [
        {
          width: 100,
          dataIndex: 'color1',
          title: '颜色1',
          key: 'color1',
          rowSpanKey: 'rowSpan',
          fixed: 'left',
          children: [
            { width: 100, dataIndex: 'color11', title: '颜色11', key: 'color11', rowSpanKey: 'rowSpan', fixed: 'left' },
            { width: 100, dataIndex: 'color12', title: '颜色12', key: 'color12', rowSpanKey: 'rowSpan', fixed: 'left' },
            { width: 100, dataIndex: 'color13', title: '颜色13', key: 'color13', rowSpanKey: 'rowSpan', fixed: 'left' },
            { width: 100, dataIndex: 'color14', title: '颜色14', key: 'color14', rowSpanKey: 'rowSpan', fixed: 'left' },
            { width: 100, dataIndex: 'color15', title: '颜色15', key: 'color15', rowSpanKey: 'rowSpan', fixed: 'left' },
            { width: 100, dataIndex: 'color16', title: '颜色16', key: 'color16', rowSpanKey: 'rowSpan', fixed: 'left' },
            { width: 100, dataIndex: 'color17', title: '颜色17', key: 'color17', rowSpanKey: 'rowSpan', fixed: 'left' },
          ],
        },
        {
          width: 100,
          dataIndex: 'color2',
          title: '颜色2',
          key: 'color2',
          rowSpanKey: 'rowSpan',
          fixed: 'left',
          children: [
            { width: 100, dataIndex: 'color21', title: '颜色21', key: 'color21', rowSpanKey: 'rowSpan', fixed: 'left' },
            {
              width: 100,
              dataIndex: 'color22',
              title: '颜色22',
              key: 'color22',
              rowSpanKey: 'rowSpan',
              fixed: 'left',
              children: [
                { width: 100, dataIndex: 'color221', title: '颜色221', key: 'color221', rowSpanKey: 'rowSpan', fixed: 'left' },
                { width: 100, dataIndex: 'color222', title: '颜色222', key: 'color222', rowSpanKey: 'rowSpan', fixed: 'left' },
              ],
            },
            { width: 100, dataIndex: 'color23', title: '颜色23', key: 'color23', rowSpanKey: 'rowSpan', fixed: 'left' },
            { width: 100, dataIndex: 'color24', title: '颜色24', key: 'color24', rowSpanKey: 'rowSpan', fixed: 'left' },
            { width: 100, dataIndex: 'color25', title: '颜色25', key: 'color25', rowSpanKey: 'rowSpan', fixed: 'left' },
          ],
        },
        { width: 100, dataIndex: 'color3', title: '颜色3', key: 'color3', rowSpanKey: 'rowSpan', fixed: 'left' },
      ],
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
