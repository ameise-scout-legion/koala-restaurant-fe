import { Form, FormInstance, Input, Modal, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllCategory } from "../../../apis/categoryApi";

interface ModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  form: FormInstance;
  fileList: any[];
  handleUploadChange: (info: any) => void;
}

const ModalCreate = ({
  isModalOpen,
  handleOk,
  handleCancel,
  form,
  fileList,
  handleUploadChange,
}: ModalProps) => {
  const { Option } = Select;
  const [categoryData, setCategoryData] = useState([]);

  const categoryLevel = categoryData?.map((category: any) => (
    <Option key={category.CategoryID} value={category.CategoryID}>
      {category.Name}
    </Option>
  ));

  useEffect(() => {
    getAllCategory().then((res: any) => {
      setCategoryData(res.data.categories);
    });
  }, []);

  return (
    <Modal
      title="Create Dishes"
      open={isModalOpen}
      onOk={handleOk}
      okText="Create"
      onCancel={handleCancel}
    >
      <Form
        name="create"
        initialValues={{ remember: true }}
        layout="vertical"
        form={form}
      >
        <Form.Item
          label="Name"
          name="name"
          className="w-full"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          className="w-full"
          rules={[
            { required: true, message: "Please input your user description!" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Preparation Time"
          name="preparationTime"
          rules={[
            { required: true, message: "Please input your preparation time!" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryID"
          rules={[{ required: true, message: "Please input your category!" }]}
        >
          <Select placeholder="Select role!" allowClear>
            {categoryLevel}
          </Select>
        </Form.Item>
        <Form.Item
          label="Upload File"
          name="file"
          rules={[
            {
              required: true,
              message: "Please upload a file!",
            },
          ]}
        >
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreate;
