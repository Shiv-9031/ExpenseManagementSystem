import React, { useEffect } from "react";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import "./Home.css";
import axios from "axios";
import moment from "moment";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { Layout } from "../../component/Layout";
import FormItem from "antd/es/form/FormItem";
import { Analytics } from "../../component/Analytics";
const { RangePicker } = DatePicker;
export const Home = () => {
  const [showModal, setShowModal] = React.useState(false);
  let [transaction, setTransaction] = React.useState([]);
  let [frequency, setFrequency] = React.useState("7");
  let [selectedDate, setselectedDate] = React.useState([]);
  let [type, setType] = React.useState("all");
  let [viewData, setviewData] = React.useState("table");
  let [editable, setEditable] = React.useState(null);

  //delete handler
  const deleteHandler = async (record) => {
    try {
      await axios.post(
        "api/v1/transaction/delete-transaction", //http://localhost:8080/
        {
          transactionId: record._id,
        }
      );
      message.success("transaction delete successfully");
    } catch (e) {
      message.error("unable to delete");
    }
  };
  //handle submit
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (editable) {
        await axios.post(
          "/api/v1/transaction/edit-transaction", //http://localhost:8080
          {
            payload: {
              ...values,
              userid: user.user._id,
            },
            transactionId: editable._id,
          }
        );
        message.success("Transaction updated successfully");
      } else {
        await axios.post(
          "/api/v1/transaction/post-transaction", //http://localhost:8080
          {
            ...values,
            userid: user.user._id,
          }
        );
        message.success("Transaction added successfully");
      }
      setEditable(null);
      setShowModal(false);
    } catch (error) {
      message.error(error);
    }
  };
  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              deleteHandler(record);
            }}
          />
        </div>
      ),
    },
  ];
  //get all transaction
  const getAllTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.post(
        "/api/v1/transaction/getAll", //http://localhost:8080
        {
          userid: user.user._id,
          frequency,
          selectedDate,
          type,
        }
      );

      if (response.data) {
        setTransaction(response.data.getAllTransaction);
        message.success("all transaction");
      }
    } catch (err) {
      message.error(err);
    }
  };

  console.log(transaction);
  //useEffect
  useEffect(() => {
    getAllTransaction();
  }, [frequency, selectedDate, type]);

  return (
    <Layout>
      <div className="Filters">
        <div className="sub-left-Filters">
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value="7">Last 1 week</Select.Option>
            <Select.Option value="30">Last 1 month</Select.Option>
            <Select.Option value="365">Last 1 year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setselectedDate(values)}
            />
          )}
        </div>
        <div className="sub-left-Filters">
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) => setType(value)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setviewData("table")}
          />
          <AreaChartOutlined
            className={`${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setviewData("analytics")}
          />
        </div>
        <div className="sub-right-Filters">
          <button
            className="add-button"
            onClick={() => setShowModal(true)}
            type="submit"
          >
            Add new
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={transaction} />
        ) : (
          <Analytics transaction={transaction} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <FormItem label="Amount" name="amount">
            <Input type="text" />
          </FormItem>
          <FormItem label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </FormItem>
          <FormItem label="Category" name="category">
            <Select>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="movie">movie</Select.Option>
              <Select.Option value="Tip">Tip</Select.Option>
              <Select.Option value="Project">Project</Select.Option>
              <Select.Option value="bills">bills</Select.Option>
              <Select.Option value="Medical">Medical</Select.Option>
              <Select.Option value="tax">tax</Select.Option>
            </Select>
          </FormItem>
          <FormItem label="Date" name="date">
            <Input type="date" />
          </FormItem>
          <FormItem label="References" name="reference">
            <Input type="text" />
          </FormItem>
          <FormItem label="Description" name="description">
            <Input type="text" />
          </FormItem>
          <div className="save-button">
            <button className="button-save" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};
