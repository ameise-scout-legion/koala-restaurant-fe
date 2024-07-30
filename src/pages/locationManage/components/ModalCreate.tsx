import { useState } from "react";
import { Form, FormInstance, Input, Modal, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface ModalProps {
  isModalOpen: boolean;
  handleOk: (formData: FormData) => void;
  handleCancel: () => void;
  form: FormInstance;
}

const ModalCreate = ({
  isModalOpen,
  handleOk,
  handleCancel,
  form,
}: ModalProps) => {
  const [fileList, setFileList] = useState([]);

  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  return (
    <Modal
      title="Create Location"
      open={isModalOpen}
      onOk={() => {
        form.validateFields().then((values) => {
          const formData = new FormData();
          fileList.forEach((file) => {
            formData.append("file", file.originFileObj);
          });
          Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
          });
          handleOk(formData);
        });
      }}
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
          label="Address"
          name="address"
          className="w-full"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          className="w-full"
          rules={[{ required: true, message: "Please input your user city!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Please input your state!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Zip Code"
          name="zipCode"
          rules={[{ required: true, message: "Please input your zip code!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Please input your country!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Upload File" name="file">
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreate;
