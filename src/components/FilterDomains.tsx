import { FilterFilled } from "@ant-design/icons";
import { Button, Drawer, Form, Input, Select, Switch } from "antd";
import { useState } from "react";

export default function FilterDomains() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <FilterFilled />
      </Button>
      <Drawer title="filters" open={isOpen} onClose={() => setIsOpen(false)}>
        <Form>
          <Form.Item label="Filter by Active status" name="isActive">
            <Switch checkedChildren="Active" unCheckedChildren="InActive" />
          </Form.Item>
          <Form.Item label="Filter by Verification Status" name="isActive">
            <Select
              placeholder="Select Status"
              options={[
                { value: "pending", label: "Pending" },
                { value: "verified", label: "Verified" },
                { value: "rejected", label: "Rejected" },
              ]}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
