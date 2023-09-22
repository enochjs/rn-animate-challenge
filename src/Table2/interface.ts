import { ReactNode } from 'react';
import { LayoutChangeEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export type IDefaultData = Record<string, unknown>;

export type IGetColumn<T> = {
  dataIndex: keyof T | 'feDataIndex';
  title: ReactNode;
  key?: string;
  render?: (text: any, record: T, index: number) => ReactNode;
  width: number;
  height?: number;
  rowSpanKey?: string;
  cellStyle?: StyleProp<ViewStyle>;
  cellTextStyle?: StyleProp<TextStyle>;
  fixed?: 'left' | 'right';
  children?: IGetColumns<T>;
};

export type IGetColumns<T> = IGetColumn<T>[];

export interface ITableCommonProps<T> {
  data: T[];
  columns: IGetColumns<T>;
  borderedRight?: boolean;
  bordered?: boolean;
  borderStyle?: {
    borderColor?: string;
    borderWidth?: number;
  };
}

export interface IPreRenderTableProps<T> extends ITableCommonProps<T> {
  onLayout: (event: LayoutChangeEvent, index: number) => void;
  widthArr?: number[];
  flexArr?: number[];
  width?: number;
}

export interface IRenderTableProps<T> extends ITableCommonProps<T> {
  heightArr?: number[];
  leftColumns?: IGetColumns<T>;
  rightColumns?: IGetColumns<T>;
  headerStyle?: StyleProp<ViewStyle>;
  tableStyle?: StyleProp<ViewStyle>;
}

export interface ITableRowProps<T> extends Omit<ITableCommonProps<T>, 'data'> {
  data: T;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  rowWidth?: number;
  widthArr?: number[];
  flexArr?: number[];
}

export interface ITableColProps<T> extends Omit<ITableCommonProps<T>, 'columns'> {
  data: T[];
  style?: StyleProp<ViewStyle>;
  width?: number;
  flex?: number;
  column: IGetColumn<T>;
  heightArr: number[];
  borderedRight?: boolean;
}

export interface ITableCellProps<T> extends Omit<ITableCommonProps<T>, 'data' | 'columns'> {
  data: T;
  dataIndex: string;
  width?: number;
  height?: number;
  flex?: number;
  rowIndex: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  borderedRight?: boolean;
  render?: (text: any, data: T, rowIndex: number) => ReactNode;
}

export interface ITableHeaderProps<T> {
  style?: StyleProp<ViewStyle>;
  width?: number;
  widthArr?: number[];
  height?: number;
  flexArr?: number[];
  columns: IGetColumns<T>;
  bordered?: boolean;
  borderStyle?: {
    borderColor?: string;
    borderWidth?: number;
  };
}

export interface ITableProps<T> extends ITableCommonProps<T> {
  tableStyle?: StyleProp<ViewStyle>;
  rowHeight?: number;
  loading?: boolean;
}

export interface IFixedColumnsProps<T> extends ITableCommonProps<T> {
  heightArr: number[];
  top: number;
  flexArr?: number[];
  widthArr?: number[];
  scrollY: SharedValue<number>;
  fixed?: 'left' | 'right';
}

export interface IFixedHeaderProps {
  style?: StyleProp<ViewStyle>;
  heightArr: number[];
  height: number;
  flexArr?: number[];
  widthArr?: number[];
  scrollY: SharedValue<number>;
  fixed?: 'left' | 'right';
  columns: any[];
  bordered?: boolean;
  borderStyle?: {
    borderColor?: string;
    borderWidth?: number;
  };
}
