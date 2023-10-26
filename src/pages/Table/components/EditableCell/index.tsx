import React from "react";
import { Form, Input } from "antd";

import DatePicker from "../DatePicker";
import Select from "../Select";
import InputNumber from "../InputNumber";

import { IEditableCellProps } from "../../types/editableCellProps.interface";

const EditableCell: React.FC<IEditableCellProps> = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}) => {
  const inputNode: { [key: string]: JSX.Element } = {
    date: <DatePicker />,
    amount: <InputNumber />,
    type: <Select />,
    note: <Input />,
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode[dataIndex]}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
