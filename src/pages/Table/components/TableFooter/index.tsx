import React from "react";
import { Flex, Typography } from "antd";

import { IncomeDataItem } from "../../types/incomeDataItem.interface";
import { EIncomeType } from "../../types/enums/incomType.enum";

const { Text } = Typography;

interface IFooterProps {
  data: IncomeDataItem[];
}

const TableFooter = ({ data }: IFooterProps) => {
  return (
    <Flex justify="space-between" align="center">
      <Text>Total</Text>
      <Text style={{ marginRight: "24px" }}>
        {data.reduce(
          (acc, item) =>
            item.type === EIncomeType.INCOME
              ? acc + item.amount
              : acc - item.amount,
          0,
        )}
      </Text>
    </Flex>
  );
};

export default TableFooter;
