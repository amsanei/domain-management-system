import { Table, Tag, Button, Space, notification  } from "antd";
import { useEffect, useState } from "react";
import CreateDomain from "./components/CreateDomain";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

function App() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (title : string, msg : string,type: NotificationType) => {
    api[type]({
      message: title,
      description:
      msg
    });
  };

  const getDomines = async () => {
    setIsLoading(true);
    const res = await fetch(
      "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain"
    );
    const data = await res.json();
    setIsLoading(false);

    const perrtyData = data.map((item: any) => ({
      "id": item.id,
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
  useEffect(() => {
    
    getDomines();
  }, []);

  const onDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const deleteDomain = async (id : number) => {
    const res = await fetch(
      `https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/${id}`,
      {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
   
    if(res.status === 200) {
      openNotification('Success', 'Domain has successfuly deleted!', 'success')
      getDomines()
    }
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
    {
      title: '',
      key: 'action',
      render: (_ : any, record : any) => (
        <Space size="middle">
          <Button type="text" danger onClick={() => deleteDomain(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="px-8 py-4 mb-8 border-b border-neutral-300 text-xl font-bold">
        DMS
      </div>
      <div>Domines</div>
      <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
        Add Domain
      </Button>

      <CreateDomain isDrawerOpen={isDrawerOpen} onDrawerClose={onDrawerClose} />

      <Table loading={isLoading} dataSource={tableData} columns={columns} />
    </div>
  );
}



export default App;
