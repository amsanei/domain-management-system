import { FilterFilled } from "@ant-design/icons";
import { Button, Checkbox, Drawer, Form, FormProps } from "antd";
import { useState } from "react";
import { Domain } from "../types";

export default function FilterDomains({
  data,
  formatData,
}: {
  data: Domain[];
  formatData: (data: Domain[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  type FieldType = {
    isActive: string[];
    status: string[];
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const filteredData = data?.filter((item: Domain) => {
      const matchesActive =
        values.isActive?.length === 0 ||
        values.isActive.includes(item.isActive.toString());

      const matchesStatus =
        values.status?.length === 0 || values.status.includes(item.status);

      return matchesActive && matchesStatus;
    });

    formatData(filteredData);
  };
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <FilterFilled />
      </Button>
      <Drawer title="filters" open={isOpen} onClose={() => setIsOpen(false)}>
        <Form
          onFinish={onFinish}
          initialValues={{
            isActive: [],
            status: [],
          }}
        >
          <Form.Item label="Filter by Active status" name="isActive">
            <Checkbox.Group
              options={[
                { value: "true", label: "Active" },
                { value: "false", label: "Inactive" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Filter by Verification Status" name="status">
            <Checkbox.Group
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
    </>
  );
}
