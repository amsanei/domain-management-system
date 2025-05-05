import { Button, Input, Switch, Form, Select } from "antd";

export default function DomainForm({
  initialValues,
  onFinish,
  isPending,
}: any) {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={
        initialValues
          ? initialValues
          : {
              isActive: false,
            }
      }
    >
      <Form.Item
        label="Domain"
        name="domain"
        rules={[
          { required: true, message: "Please enter domain URL" },
          {
            validator: (_, value) => {
              if (
                !value ||
                /^https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+$/i.test(value)
              ) {
                return Promise.resolve();
              }
              return Promise.reject(
                "Please enter a valid URL starting with http:// or https://"
              );
            },
          },
        ]}
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
        <Button type="primary" htmlType="submit" loading={isPending}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
