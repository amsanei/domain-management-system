import { Button, Input, Switch, Form, Select } from "antd";

export default function DomainForm({ initialValues, onFinish }: any) {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={
        initialValues
          ?initialValues
          : {
              isActive: false,
            }
      }
    >
      <Form.Item
        label="Domain"
        name="domain"
        rules={[{ required: true, message: "Please enter domain URL" }]}
      >
        <Input placeholder="EX: amsanei.github.io" />
      </Form.Item>
      <Form.Item label="Active Status" name="isActive" valuePropName="checked">
        <Switch checkedChildren="Active" unCheckedChildren="InActive" />
      </Form.Item>
      <Form.Item
        label="Verification Status"
        name="status"
        rules={[
          { required: true, message: "Please Select Verification Status" },
        ]}
      >
        <Select
          placeholder="Select Status"
          options={[
            { value: "pending", label: "Pending" },
            { value: "verified", label: "Verified" },
            { value: "rejected", label: "Rejected" },
          ]}
        />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
