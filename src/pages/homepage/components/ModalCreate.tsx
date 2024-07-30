import { Form, FormInstance, Input, Modal, Select } from "antd";

interface ModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  form: FormInstance;
}

const ModalCreate = ({
  isModalOpen,
  handleOk,
  handleCancel,
  form,
}: ModalProps) => {
  const { Option } = Select;
  return (
    <Modal
      title="Create User"
      open={isModalOpen}
      onOk={handleOk}
      okText="Create"
      onCancel={handleCancel}
    >
      <Form
        name="basic"
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
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreate;
