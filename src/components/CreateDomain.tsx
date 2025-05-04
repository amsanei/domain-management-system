import { Drawer, Button, Input, Switch, Form, Select, FormProps } from "antd";
import useCreateNotification from "../hooks/useCreateNotification";

export default function CreateDomain({
  isDrawerOpen,
  onDrawerClose,
  refreshFn,
}: any) {
  const [form] = Form.useForm();
  const { notify } = useCreateNotification();

  type FieldType = {
    domain: string;
    isActive: boolean;
    status: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const res = await fetch(
      "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          createdDate: Date.now(),
          domain: values.domain,
          status: values.status,
          isActive: values.isActive,
        }),
      }
    );
    if (res.status === 201) {
      notify({
        type: "success",
        message: "Success!",
        description: "You created a new Domain.",
      });
      refreshFn();
      onDrawerClose();
    }
  };

  return (
    <Drawer title="Add domain" onClose={onDrawerClose} open={isDrawerOpen}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          isActive: false,
        }}
      >
        <Form.Item
          label="Domain"
          name="domain"
          rules={[{ required: true, message: "Please enter domain URL" }]}
        >
          <Input placeholder="EX: amsanei.github.io" />
        </Form.Item>
        <Form.Item
          label="Active Status"
          name="isActive"
          valuePropName="checked"
        >
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
    </Drawer>
  );
}
