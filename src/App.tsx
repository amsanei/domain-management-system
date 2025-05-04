import {
  Table,
  Tag,
  Button,
  Typography,
  Dropdown,
  MenuProps,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import CreateDomain from "./components/CreateDomain";
import SearchDomain from "./components/SearchDomain";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import useCreateNotification from "./hooks/useCreateNotification";
import EditDomain from "./components/EditDomain";

const { Link } = Typography;

function App() {
  const { notify, contextHolder } = useCreateNotification();
  const [rawData, setRawData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
  });

  const handleTableChange = (pagination: any) => {
    setTablePagination((prev) => ({
      ...prev,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  const getDomines = async () => {
    setIsLoading(true);
    const res = await fetch(
      "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain"
    );
    const data = await res.json();
    setIsLoading(false);

    const perrtyData = data.map((item: any) => ({
      id: item.id,
      "domin-url": (
        <div className="flex gap-1 items-baseline">
          {item.isActive ? (
            <Tooltip title="Active">
              <span className="relative flex size-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full
                    bg-green-400 opacity-75"
                ></span>
                <span className="relative inline-flex size-2 rounded-full bg-green-400"></span>
              </span>
            </Tooltip>
          ) : (
            <Tooltip title="Not Active">
              <span className="size-2 bg-neutral-400 rounded-full"></span>
            </Tooltip>
          )}

          <div className={`size-2  rounded-full`}></div>
          <span>{item.domain}</span>
          <Tooltip>
            <Link type="secondary" href={item.domain} target="_blank">
              <LinkOutlined />
            </Link>
          </Tooltip>
        </div>
      ),
      "created-at": new Date(item.createdDate).toLocaleString(),
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
    setRawData(perrtyData);
    setTableData(perrtyData);
  };
  useEffect(() => {
    getDomines();
  }, []);

  const onDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const deleteDomain = async (id: number) => {
    const res = await fetch(
      `https://6797aa2bc2c861de0c6d964c.mockapi.io/domain/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      notify({
        type: "success",
        message: "Success!",
        description: "Domain has successfuly deleted!",
      });
      getDomines();
    }
  };

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
      title: "Created At",
      dataIndex: "created-at",
      key: "created-at",
    },
    {
      title: "",
      key: "action",
      render: (_: any, record: any) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <button
                onClick={() => {
                  setSelectedDomain(record.id);
                  setIsEditDrawerOpen(true);
                }}
                className="flex gap-2 items-center cursor-pointer"
              >
                <EditOutlined />
                <span>Edit</span>
              </button>
            ),
          },
          {
            key: "2",
            danger: true,
            label: (
              <button
                onClick={() => deleteDomain(record.id)}
                className="flex gap-2 items-center cursor-pointer"
              >
                <DeleteOutlined />
                <span>Delete</span>
              </button>
            ),
          },
        ];
        return (
          <Dropdown trigger={["click"]} menu={{ items }}>
            <EllipsisOutlined />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl">Domines</div>
          <div className="flex gap-4 items-center">
            <SearchDomain data={rawData} setTableData={setTableData} />
            <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
              Add Domain
            </Button>
          </div>
        </div>
        <EditDomain
          isDrawerOpen={isEditDrawerOpen}
          onDrawerClose={() => setIsEditDrawerOpen(false)}
          selectedDomain={selectedDomain}
          refreshFn={getDomines}
        />
        <CreateDomain
          refreshFn={getDomines}
          isDrawerOpen={isDrawerOpen}
          onDrawerClose={onDrawerClose}
        />

        <Table
          loading={isLoading}
          dataSource={tableData}
          columns={columns}
          pagination={tablePagination}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default App;
