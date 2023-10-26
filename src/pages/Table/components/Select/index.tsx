import React from "react";
import { Select as CoreSelect } from "antd";

import { EIncomeType } from "../../types/enums/incomType.enum";

const Select: React.FC = props => {
  const options = [
    {
      value: EIncomeType.EXPENSE,
      label: "expense",
    },
    {
      value: EIncomeType.INCOME,
      label: "income",
    },
  ];
  return <CoreSelect options={options} {...props} />;
};

export default Select;
