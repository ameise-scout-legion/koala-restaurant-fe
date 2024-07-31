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
      title="Create Menu"
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
          <Input.TextArea rows={6}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreate;
