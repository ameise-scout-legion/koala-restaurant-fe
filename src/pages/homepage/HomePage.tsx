import {
  Button,
  Form,
  Input,
  Space,
  Table,
  TableProps,
  notification,
} from "antd";
import Layout from "../Layout";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  createUser,
  deleteUser,
  getAllUserByLocation,
  updateUser,
} from "../../apis/userApi";
import { useLocation } from "../../hooks/locationHook";
import ModalCreate from "./components/ModalCreate";
import { CreateUserResponse } from "../../types/userType";
import ModalUpdate from "./components/ModalUpdate";

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
  const { location } = useLocation();
  const [userData, setUserData] = useState([]);
  const [filteredUserData, setFilteredUserData] = useState<DataType[]>([]);
  const [recordValue, setRecordValue] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "User Name",
      dataIndex: "Login",
      key: "login",
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
      render: (text: string) => <div>{text ? text : "Phone"}</div>,
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
      render: (_, record) => (
        <Space size="middle">
          <a>
            <EyeOutlined
              onClick={() => {
                handleOpenModalUpdate(record);
              }}
            />
          </a>
          <a>
            <DeleteOutlined
              className="text-red-500"
              onClick={() => handleDeleteUser(record)}
            />
          </a>
        </Space>
      ),
    },
  ];

  const fetchUserData = async (locationID: number) => {
    setLoading(true);
    try {
      const res: any = await getAllUserByLocation(locationID);
      setUserData(res.data);
      setFilteredUserData(res.data);
    } catch (error: any) {
      notification.error({
        message: "Error fetching user data",
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    const formValue = form.getFieldsValue();
    const payload = {
      ...formValue,
      locationID: location?.LocationID,
    };
    try {
      const res: CreateUserResponse | any = await createUser(payload);
      setIsModalOpen(false);
      if (res) {
        notification.success({
          message: res?.data.message,
        });
      }
      if (location) {
        fetchUserData(location.LocationID);
      }
    } catch (error: any) {
      notification.error({
        message: "Error creating user",
        description: error.message,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalUpdateOpen(false);
    setRecordValue(null);
  };

  const handleDeleteUser = async (record: DataType) => {
    await deleteUser(record.UserID).then((res: any) => {
      notification.success({
        message: res?.data.message,
      });
      if (location) {
        fetchUserData(location.LocationID);
      }
    });
  };

  const handleOpenModalUpdate = (record: DataType) => {
    setRecordValue(record);
    setIsModalUpdateOpen(true);
  };

  const handleUpdate = async () => {
    const formValue = formUpdate.getFieldsValue();
    const payload = {
      ...formValue,
      locationID: location?.LocationID,
    };

    try {
      const res: CreateUserResponse | any = await updateUser(
        recordValue.UserID,
        payload
      );
      setIsModalUpdateOpen(false);
      if (res) {
        notification.success({
          message: res?.data.message,
        });
      }
      if (location) {
        fetchUserData(location.LocationID);
      }
    } catch (error: any) {
      notification.error({
        message: "Error update user",
        description: error.message,
      });
    }
  };

  const handleSearch = (value: string) => {
    if (!value) {
      setFilteredUserData(userData);
    } else {
      const filteredData = userData.filter(
        (user: DataType) =>
          user.Name.toLowerCase().includes(value.toLowerCase()) ||
          user.Login.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUserData(filteredData);
    }
  };

  useEffect(() => {
    if (location) {
      fetchUserData(location.LocationID);
    }
  }, [location]);

  return (
    <Layout>
      <div className="m-5 mb-0 p-5 pl-24 gap-4 rounded-lg bg-primary h-full block">
        <div className="flex justify-between mb-10">
          <Search
            placeholder="input search text"
            enterButton
            style={{ width: 500 }}
            onSearch={handleSearch}
          />
          <Button onClick={() => setIsModalOpen(true)}>Create User</Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredUserData}
          loading={loading}
          className="border rounded overflow-x-scroll sm:overflow-x-auto"
        />
      </div>
      <ModalCreate
        form={form}
        handleCancel={handleCancel}
        handleOk={handleCreate}
        isModalOpen={isModalOpen}
      />
      <ModalUpdate
        form={formUpdate}
        handleCancel={handleCancel}
        handleOk={handleUpdate}
        isModalOpen={isModalUpdateOpen}
        record={recordValue}
      />
    </Layout>
  );
};

export default HomePage;
