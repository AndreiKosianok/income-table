import { EIncomeType } from "./enums/incomType.enum";

export interface IncomeDataItem {
  key: string;
  date: number;
  amount: number;
  type: EIncomeType;
  note: string;
}
