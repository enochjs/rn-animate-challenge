import { ReactNode } from 'react';
import { LayoutChangeEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type IDefaultData = Record<string, unknown>;

type IGetColumn<T> = {
  dataIndex: keyof T | 'feDataIndex';
  title: ReactNode;
  key?: string;
  render?: (text: any, record: T, index: number) => ReactNode;
  width: number;
  height?: number;
  rowSpanKey?: string;
  cellStyle?: StyleProp<ViewStyle>;
  cellTextStyle?: StyleProp<TextStyle>;
};

declare type IGetColumns<T> = IGetColumn<T>[];

export interface ITableCommonProps<T> {
  data: T[];
  columns: IGetColumns<T>;
}

export interface IPreRenderTableProps<T> extends ITableCommonProps<T> {
  onLayout: (event: LayoutChangeEvent, index: number) => void;
  widthArr?: number[];
  flexArr?: number[];
  width?: number;
}

export interface IRenderTableProps<T> extends ITableCommonProps<T> {
  heightArr: number[];
}

export interface ITableRowProps<T> {
  data: T;
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  rowWidth?: number;
  widthArr?: number[];
  flexArr?: number[];
  columns: IGetColumns<T>;
}

export interface ITableColProps<T> {
  data: T[];
  style?: StyleProp<ViewStyle>;
  width?: number;
  flex?: number;
  column: IGetColumn<T>;
  heightArr: number[];
}

export interface ITableCellProps<T> {
  data: T;
  dataIndex: string;
  width?: number;
  height?: number;
  flex?: number;
  rowIndex: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  borderStyle?: {
    borderColor?: string;
    borderWidth?: number;
  };
  render?: (text: any, data: T, rowIndex: number) => ReactNode;
}

export interface ITableHeaderProps<T> {
  style?: StyleProp<ViewStyle>;
  width?: number;
  widthArr?: number[];
  height?: number;
  flexArr?: number[];
  columns: IGetColumns<T>;
}

export interface ITableProps<T> extends ITableCommonProps<T> {
  tableStyle?: StyleProp<ViewStyle>;
}
