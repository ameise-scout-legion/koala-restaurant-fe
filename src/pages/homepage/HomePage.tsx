import { Button, Input, Space, Table, TableProps } from "antd";
import Layout from "../Layout";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";

interface DataType {
  UserID: number;
  Name: string;
  Role: string;
  ContactDetails: string | null;
  Login: string;
  CreationDate: string;
  ModificationDate: string;
  LocationID: number;
}

const HomePage = () => {
  const { Search } = Input;

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Role",
      dataIndex: "Role",
      key: "role",
    },
    {
      title: "Contact Details",
      dataIndex: "ContactDetails",
      key: "contact",
      render: (text: string) => <div>{text ? text : "NaN"}</div>,
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      key: "date",
      render: (text: string) => <div>{moment(text).format("DD/MM/YYYY")}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>
            <EyeOutlined />
          </a>
          <a>
            <DeleteOutlined className="text-red-500" />
          </a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      UserID: 2,
      Name: "Gustavo Fring",
      Role: "Owner",
      ContactDetails: "Phone",
      Login: "Gustavo",
      CreationDate: "2024-06-27T18:14:59.000Z",
      ModificationDate: "2024-07-09T09:27:26.000Z",
      LocationID: 2,
    },
    {
      UserID: 5,
      Name: "Victor",
      Role: "Waiter",
      ContactDetails: null,
      Login: "Victor",
      CreationDate: "2024-07-03T10:09:52.000Z",
      ModificationDate: "2024-07-03T15:53:07.000Z",
      LocationID: 2,
    },
    {
      UserID: 5,
      Name: "Victor",
      Role: "Waiter",
      ContactDetails: null,
      Login: "Victor",
      CreationDate: "2024-07-03T10:09:52.000Z",
      ModificationDate: "2024-07-03T15:53:07.000Z",
      LocationID: 2,
    },
    {
      UserID: 5,
      Name: "Victor",
      Role: "Waiter",
      ContactDetails: null,
      Login: "Victor",
      CreationDate: "2024-07-03T10:09:52.000Z",
      ModificationDate: "2024-07-03T15:53:07.000Z",
      LocationID: 2,
    },
    {
      UserID: 5,
      Name: "Victor",
      Role: "Waiter",
      ContactDetails: null,
      Login: "Victor",
      CreationDate: "2024-07-03T10:09:52.000Z",
      ModificationDate: "2024-07-03T15:53:07.000Z",
      LocationID: 2,
    },
    {
      UserID: 5,
      Name: "Victor",
      Role: "Waiter",
      ContactDetails: null,
      Login: "Victor",
      CreationDate: "2024-07-03T10:09:52.000Z",
      ModificationDate: "2024-07-03T15:53:07.000Z",
      LocationID: 2,
    },
    {
      UserID: 5,
      Name: "Victor",
      Role: "Waiter",
      ContactDetails: null,
      Login: "Victor",
      CreationDate: "2024-07-03T10:09:52.000Z",
      ModificationDate: "2024-07-03T15:53:07.000Z",
      LocationID: 2,
    },
    {
      UserID: 5,
      Name: "Victor",
      Role: "Waiter",
      ContactDetails: null,
      Login: "Victor",
      CreationDate: "2024-07-03T10:09:52.000Z",
      ModificationDate: "2024-07-03T15:53:07.000Z",
      LocationID: 2,
    },
    {
      UserID: 5,
      Name: "Victor",
      Role: "Waiter",
      ContactDetails: null,
      Login: "Victor",
      CreationDate: "2024-07-03T10:09:52.000Z",
      ModificationDate: "2024-07-03T15:53:07.000Z",
      LocationID: 2,
    },
    {
      UserID: 5,
      Name: "Victor",
      Role: "Waiter",
      ContactDetails: null,
      Login: "Victor",
      CreationDate: "2024-07-03T10:09:52.000Z",
      ModificationDate: "2024-07-03T15:53:07.000Z",
      LocationID: 2,
    },
    {
      UserID: 5,
      Name: "Victor",
      Role: "Waiter",
      ContactDetails: null,
      Login: "Victor",
      CreationDate: "2024-07-03T10:09:52.000Z",
      ModificationDate: "2024-07-03T15:53:07.000Z",
      LocationID: 2,
    },
    {
      UserID: 5,
      Name: "Victor",
      Role: "Waiter",
      ContactDetails: null,
      Login: "Victor",
      CreationDate: "2024-07-03T10:09:52.000Z",
      ModificationDate: "2024-07-03T15:53:07.000Z",
      LocationID: 2,
    },
  ];

  return (
    <Layout>
      <div className="m-5 mb-0 p-5 pl-24 gap-4 rounded-lg bg-primary h-full block">
        <div className="flex justify-between mb-10">
          <Search
            placeholder="input search text"
            enterButton
            style={{ width: 500 }}
          />
          <Button>Create User</Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          className="border rounded overflow-x-scroll sm:overflow-x-auto"
        />
      </div>
    </Layout>
  );
};

export default HomePage;
