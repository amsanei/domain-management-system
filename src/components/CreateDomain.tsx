import { Drawer, Space, Button, Input, InputRef } from "antd";
import { useRef } from "react";

export default function CreateDomain({ isDrawerOpen, onDrawerClose }: any) {
  const inputRef = useRef<InputRef>(null);

  const createNewDomain = async () => {
    if (inputRef.current) {
      const res = await fetch(
        "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            createdDate: 1737992850,
            domain: inputRef.current.input?.value,
            status: "new status",
            isActive: true,
          }),
        }
      );
      console.log(await res.json());
    }
  };
  return (
    <Drawer
      title="Add domain"
      onClose={onDrawerClose}
      open={isDrawerOpen}
      extra={
        <Space>
          <Button onClick={onDrawerClose}>Cancel</Button>
          <Button type="primary" onClick={createNewDomain}>
            OK
          </Button>
        </Space>
      }
    >
      <Input placeholder="EX: amsanei.github.io" ref={inputRef} />
    </Drawer>
  );
}
