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
import { useLocation } from "../../hooks/locationHook";
import ModalCreate from "./components/ModalCreate";
import { CreateUserResponse } from "../../types/userType";
import ModalUpdate from "./components/ModalUpdate";
import {
  createLocation,
  deleteLocation,
  getAllLocation,
  updateLocation,
} from "../../apis/locationApi";

interface DataType {
  Address: string;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  CreationDate: string;
  ModificationDate: string;
  LocationID: number;
}

const LocationManage = () => {
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
      title: "Address",
      dataIndex: "Address",
      key: "address",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "City",
      dataIndex: "City",
      key: "city",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "State",
      dataIndex: "State",
      key: "state",
    },
    {
      title: "ZipCode",
      dataIndex: "ZipCode",
      key: "zipcode",
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

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res: any = await getAllLocation();
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
    await form.validateFields();
    const payload = form.getFieldsValue();

    try {
      const res: CreateUserResponse | any = await createLocation(payload);
      setIsModalOpen(false);
      if (res) {
        form.resetFields()
        notification.success({
          message: res?.data.message,
        });
      }
      if (location) {
        fetchUserData();
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
    await deleteLocation(record.LocationID).then((res: any) => {
      notification.success({
        message: res?.data.message,
      });
      if (location) {
        fetchUserData();
      }
    });
  };

  const handleOpenModalUpdate = (record: DataType) => {
    setRecordValue(record);
    setIsModalUpdateOpen(true);
  };

  const handleUpdate = async () => {
    await formUpdate.validateFields();
    const payload = formUpdate.getFieldsValue();

    try {
      const res: CreateUserResponse | any = await updateLocation(
        recordValue.LocationID,
        payload
      );
      setIsModalUpdateOpen(false);
      if (res) {
        notification.success({
          message: res?.data.message,
        });
      }
      if (location) {
        fetchUserData();
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
          user.Address.toLowerCase().includes(value.toLowerCase()) ||
          user.City.toLowerCase().includes(value.toLowerCase()) ||
          user.State.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUserData(filteredData);
    }
  };

  useEffect(() => {
    if (location) {
      fetchUserData();
    }
  }, [location]);

  return (
    <Layout>
      <div className="lg:m-5 mb-0 p-5 lg:pl-24 gap-4 rounded-lg bg-primary h-full block">
        <div className="flex justify-between mb-10">
          <Search
            placeholder="input search text"
            enterButton
            style={{ width: 500 }}
            onSearch={handleSearch}
          />
          <Button onClick={() => setIsModalOpen(true)}>Create Location</Button>
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

export default LocationManage;
