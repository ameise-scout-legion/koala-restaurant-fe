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
import ModalUpdate from "./components/ModalUpdate";
import {
  createDishes,
  deleteDishes,
  getAllDishes,
  updateDishes,
} from "../../apis/dishesApi";

interface DataType {
  DishName: string;
  Description: string;
  Price: number;
  PreparationTime: string;
  ImageLink: string;
  CreationDate: string;
  ModificationDate: string;
  CategoryID: number;
  CategoryName: string;
  DishID: number;
}

const Dishes = () => {
  const { Search } = Input;
  const { location } = useLocation();
  const [userData, setUserData] = useState([]);
  const [filteredUserData, setFilteredUserData] = useState<DataType[]>([]);
  const [fileList, setFileList] = useState<any>([]);
  const [recordValue, setRecordValue] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Dish Name",
      dataIndex: "DishName",
      key: "dishName",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "description",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "price",
    },
    {
      title: "Preparation Time",
      dataIndex: "PreparationTime",
      key: "preparationTime",
    },
    {
      title: "Image",
      dataIndex: "ImageLink",
      key: "image",
      render: (text: string) => <img src={text} width={40} height={40} />,
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      key: "date",
      render: (text: string) => <div>{moment(text).format("DD/MM/YYYY")}</div>,
    },
    {
      title: "Category",
      dataIndex: "CategoryName",
      key: "category",
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
      const res: any = await getAllDishes();
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
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj);
      }

      const res: any = await createDishes(formData);
      if (res) {
        form.resetFields()
        notification.success({
          message: res?.data?.message,
        });
        setIsModalOpen(false);
        form.resetFields();
        setFileList([]);
        fetchUserData();
      }
    } catch (error: any) {
      notification.error({
        message: "Error creating dish",
        description: error.message,
      });
    }
  };

  const handleUploadChange = ({ fileList }: any) => setFileList(fileList);

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalUpdateOpen(false);
    setRecordValue(null);
    setFileList([]);
  };

  const handleDeleteUser = async (record: DataType) => {
    await deleteDishes(record.DishID).then((res: any) => {
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
    try {
      await formUpdate.validateFields();
      const values = formUpdate.getFieldsValue();
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj);
      }

      const res: any = await updateDishes(recordValue.DishID, formData);
      if (res) {
        notification.success({
          message: res?.data?.message,
        });
        setIsModalUpdateOpen(false);
        formUpdate.resetFields();
        setFileList([]);
        fetchUserData();
      }
    } catch (error: any) {
      notification.error({
        message: "Error update dish",
        description: error.message,
      });
    }
  };

  // const handleUpdate = async () => {
  //   await formUpdate.validateFields();
  //   const payload = formUpdate.getFieldsValue();

  //   try {
  //     const res: CreateUserResponse | any = await updateLocation(
  //       recordValue.LocationID,
  //       payload
  //     );
  //     setIsModalUpdateOpen(false);
  //     if (res) {
  //       notification.success({
  //         message: res?.data.message,
  //       });
  //     }
  //     if (location) {
  //       fetchUserData();
  //     }
  //   } catch (error: any) {
  //     notification.error({
  //       message: "Error update user",
  //       description: error.message,
  //     });
  //   }
  // };

  const handleSearch = (value: string) => {
    if (!value) {
      setFilteredUserData(userData);
    } else {
      const filteredData = userData.filter(
        (user: DataType) =>
          user.CategoryName.toLowerCase().includes(value.toLowerCase()) ||
          user.DishName.toLowerCase().includes(value.toLowerCase()) ||
          user.Description.toLowerCase().includes(value.toLowerCase())
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
          <Button onClick={() => setIsModalOpen(true)}>Create Dishes</Button>
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
        fileList={fileList}
        handleUploadChange={handleUploadChange}
      />
      <ModalUpdate
        form={formUpdate}
        handleCancel={handleCancel}
        handleOk={handleUpdate}
        isModalOpen={isModalUpdateOpen}
        record={recordValue}
        fileList={fileList}
        handleUploadChange={handleUploadChange}
      />
    </Layout>
  );
};

export default Dishes;
