import { IncomeDataItem } from "./incomeDataItem.interface";

export interface IEditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  record: IncomeDataItem;
  index: number;
  children: React.ReactNode;
}
