import { Form, FormInstance, Input, Modal } from "antd";

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
  return (
    <Modal
      title="Create Location"
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
      </Form>
    </Modal>
  );
};

export default ModalCreate;
