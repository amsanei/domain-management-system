import { FilterFilled } from "@ant-design/icons";
import { Badge, Button, Checkbox, Drawer, Form, FormProps } from "antd";
import { useState } from "react";

export default function Filter({
  setFilters,
}: {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      isActive: string[];
      status: string[];
    }>
  >;
}) {
  const [filtersCount, setFiltersCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  type FieldType = {
    isActive: string[];
    status: string[];
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setFilters(values);
    setFiltersCount(values.status.length + values.isActive.length);
    setIsOpen(false);
  };

  return (
    <>
      <Badge count={filtersCount} color="blue">
        <Button onClick={() => setIsOpen(true)}>
          <FilterFilled />
        </Button>
      </Badge>
      <Drawer title="Filters" open={isOpen} onClose={() => setIsOpen(false)}>
        <Form
          onFinish={onFinish}
          layout="vertical"
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
