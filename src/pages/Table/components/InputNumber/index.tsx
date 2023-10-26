import React from "react";
import { InputNumber as CoreInputNumber } from "antd";

const InputNumber: React.FC = props => {
  return <CoreInputNumber {...props} addonAfter="$" min="0" />;
};

export default InputNumber;
