import { Table, Tag } from "antd";
import { useEffect, useState } from "react";

function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getDomines = async () => {
      const res = await fetch(
        "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain"
      );
      const data = await res.json();

      const perrtyData = data.map((item : any) => ({
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

  return (
    <div>
      <div className="px-8 py-4 mb-8 border-b border-neutral-300 text-xl font-bold">
        DMS
      </div>
      <Table dataSource={tableData} columns={columns} />
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
