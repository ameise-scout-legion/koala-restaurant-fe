import { Form, FormInstance, Input, Modal } from "antd";
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
  useEffect(() => {
    if (record) {
      form.setFieldsValue({
        name: record?.Name,
        description: record?.Description,
      });
    }
  }, [record, form]);

  return (
    <Modal
      title="Update Category"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Update"
    >
      <Form name="updateCategory" layout="vertical" form={form}>
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

export default ModalUpdate;
