import { Form, FormInstance, Input, Modal, Select } from "antd";
import { useEffect } from "react";

interface ModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  form: FormInstance;
  record: any;
}

const ModalUpdate = ({
  isModalOpen,
  handleOk,
  handleCancel,
  form,
  record,
}: ModalProps) => {
  const { Option } = Select;

  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        name: record?.Name,
        login: record?.Login, 
        role: record?.Role,
      });
    }
  }, [record, form]);

  return (
    <Modal
      title="Update User"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Update"
    >
      <Form name="basic" layout="vertical" form={form}>
        <Form.Item
          label="Name"
          name="name"
          className="w-full"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Select placeholder="Select role!" allowClear>
            <Option value="Owner">Owner</Option>
            <Option value="Waiter">Waiter</Option>
            <Option value="Chef">Chef</Option>
            <Option value="Customer">Customer </Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="UserName"
          name="login"
          className="w-full"
          rules={[{ required: true, message: "Please input your user name!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdate;
