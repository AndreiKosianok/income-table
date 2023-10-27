import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import dayjs from "dayjs";
import {
  Table as CoreTable,
  Form,
  Typography,
  Button,
  Dropdown,
  message,
  Space,
} from "antd";
import {
  EllipsisOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import useLocalStorage from "./hooks/useLocalSorage";
import { LOCALSTORAGE_KEY } from "src/constants";

import EditableCell from "./components/EditableCell";
import TableFooter from "./components/TableFooter";

import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";
import { EIncomeType } from "./types/enums/incomType.enum";
import { ETableActionType } from "./types/enums/tableActionType.enum";
import { IncomeDataItem } from "./types/incomeDataItem.interface";
import { EDATE_FORMAT } from "src/types/enums/dateFormat.enum";
import { IEditableCellProps } from "./types/editableCellProps.interface";

const Table: React.FC = () => {
  const [form] = Form.useForm();
  const [getLocalData, setLocalData] = useLocalStorage(LOCALSTORAGE_KEY, []);

  const [dataSource, setDataSource] = useState<IncomeDataItem[]>(getLocalData);
  const [editingKey, setEditingKey] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setLocalData(dataSource);
  }, [dataSource]);

  const isEditingCurrentRow = (record: IncomeDataItem) =>
    record.key === editingKey;
  const isEditDiallogOpen = editingKey !== "";

  const editItem = (record: Partial<IncomeDataItem> & { key: React.Key }) => {
    const { date, amount, type, note, key } = record;
    form.setFieldsValue({ date: dayjs(date), amount, type, note });
    setEditingKey(key);
  };

  const deleteItem = (key: React.Key) => {
    setDataSource(dataSource => dataSource.filter(item => item.key !== key));
  };

  const cancel = (key: React.Key) => {
    if (key === "newItem") {
      setDataSource(dataSource => dataSource.filter(item => item.key !== key));
    }

    form.resetFields();
    setEditingKey("");
  };

  const handleAddRow = () => {
    const newItem: IncomeDataItem = {
      key: "newItem",
      date: Date.now(),
      amount: 0,
      type: EIncomeType.EXPENSE,
      note: "",
    };

    setDataSource(data => [...data, newItem]);
    setEditingKey(newItem.key);
  };

  const saveItem = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IncomeDataItem;

      setDataSource(data =>
        data.map(item => (item.key === key ? { ...row, key: uuid() } : item)),
      );
      form.resetFields();
      setEditingKey("");
    } catch (errInfo) {
      messageApi.open({
        type: "error",
        content: "Validate Failed",
      });
    }
  };

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  const items: MenuProps["items"] = [
    {
      key: ETableActionType.edit,
      label: "Edit",
    },
    {
      key: ETableActionType.delete,
      label: "Delete",
    },
  ];

  const columns: ColumnsType<IncomeDataItem> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 300,
      defaultSortOrder: "descend",
      sorter: (a, b) => (dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1),
      render: text => (
        <Typography.Text>
          {dayjs(text).format(EDATE_FORMAT.dateFormat)}
        </Typography.Text>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.amount - b.amount,
      render: (text, { type }) => (
        <Typography.Text>
          {`${type === EIncomeType.EXPENSE ? "-" : ""}${text}$`}
        </Typography.Text>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      fixed: "right",
      width: 100,
      render: record =>
        isEditingCurrentRow(record) ? (
          <Space>
            <Typography.Link onClick={() => cancel(record.key)}>
              <CloseOutlined />
            </Typography.Link>
            <Typography.Link onClick={() => saveItem(record.key)}>
              <CheckOutlined />
            </Typography.Link>
          </Space>
        ) : (
          <Dropdown
            disabled={isEditDiallogOpen}
            menu={{
              items,
              onClick: e => {
                switch (e.key) {
                  case ETableActionType.edit:
                    editItem(record);
                    break;
                  case ETableActionType.delete:
                    deleteItem(record.key);
                    break;
                  default:
                    break;
                }
              },
            }}
            placement="bottomRight"
          >
            <EllipsisOutlined
              rotate={90}
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={e => e.preventDefault()}
            />
          </Dropdown>
        ),
    },
  ];

  const mergedCols = columns.map(col =>
    col.key !== "action"
      ? {
          ...col,
          onCell: (record: IncomeDataItem) =>
            ({
              record,
              dataIndex: col.key,
              title: col.title,
              editing: isEditingCurrentRow(record),
            }) as IEditableCellProps,
        }
      : col,
  );

  return (
    <div>
      {contextHolder}
      <Button
        type="primary"
        onClick={handleAddRow}
        disabled={isEditDiallogOpen}
        style={{ marginBottom: 16 }}
      >
        Add new
      </Button>
      <Form form={form} component={false}>
        <CoreTable
          components={components}
          dataSource={dataSource}
          columns={mergedCols}
          footer={currentPageData => (
            <TableFooter data={currentPageData as IncomeDataItem[]} />
          )}
          pagination={{
            hideOnSinglePage: true,
          }}
        />
      </Form>
    </div>
  );
};

export default Table;
