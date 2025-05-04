import { Table, Tag, Drawer, Button, Input, Space } from "antd";
import { useEffect, useState } from "react";

function App() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const getDomines = async () => {
      setIsLoading(true);
      const res = await fetch(
        "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain"
      );
      const data = await res.json();
      setIsLoading(false);

      const perrtyData = data.map((item: any) => ({
        "domin-url": item.domain,
        "active-status": item.isActive ? (
          <Tag color="success">Active</Tag>
        ) : (
          <Tag color="default">Not Active</Tag>
        ),
        "verification-status": (
          <Tag
            color={
              item.status === "verified"
                ? "success"
                : item.status === "pending"
                ? "warning"
                : "error"
            }
          >
            {item.status}
          </Tag>
        ),
      }));
      setTableData(perrtyData);
    };
    getDomines();
  }, []);

  const onDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <div className="px-8 py-4 mb-8 border-b border-neutral-300 text-xl font-bold">
        DMS
      </div>
      <div>Domines</div>
      <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
        Add Domain
      </Button>

      <Drawer
        title="Add domain"
        onClose={onDrawerClose}
        open={isDrawerOpen}
        extra={
          <Space>
            <Button onClick={onDrawerClose}>Cancel</Button>
            <Button type="primary" onClick={onDrawerClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Input placeholder="EX: amsanei.github.io" />
      </Drawer>

      <Table loading={isLoading} dataSource={tableData} columns={columns} />
    </div>
  );
}

const columns = [
  {
    title: "Domin URL",
    dataIndex: "domin-url",
    key: "domin-url",
  },
  {
    title: "Active Status",
    dataIndex: "active-status",
    key: "active-status",
  },
  {
    title: "Verification Status",
    dataIndex: "verification-status",
    key: "verification-status",
  },
];

export default App;
