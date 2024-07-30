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
        address: record?.Address,
        city: record?.City,
        state: record?.State,
        zipCode: record?.ZipCode,
        country: record?.Country,
      });
    }
  }, [record, form]);

  return (
    <Modal
      title="Update Location"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Update"
    >
      <Form name="basic" layout="vertical" form={form}>
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

export default ModalUpdate;
