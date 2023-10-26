import React from "react";
import { DatePicker as CoreDatePicker } from "antd";

import { EDATE_FORMAT } from "src/types/enums/dateFormat.enum";

import type { DatePickerProps } from "antd";

const DatePicker: React.FC = (porps: DatePickerProps) => {
  return <CoreDatePicker format={EDATE_FORMAT.dateFormat} {...porps} />;
};

export default DatePicker;
