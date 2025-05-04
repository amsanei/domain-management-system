import {
  Button,
  Dropdown,
  MenuProps,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { useGetDomainsQuery } from "../state/domains/domainsApiSlice";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import SearchDomain from "./SearchDomain";
import CreateDomain from "./CreateDomain";
import EditDomain from "./EditDomain";
import DestroyDomain from "./DestroyDomain";

const { Link } = Typography;

export default function DomainsList() {
  const { data: domains, isLoading, refetch } = useGetDomainsQuery({});
  const [tableData, setTableData] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const onDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const [tablePagination, setTablePagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
  });
  const handleTableChange = (pagination: any) => {
    setTablePagination((prev: any) => ({
      ...prev,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
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
            label: <DestroyDomain id={record.id} callBack={refetch} />,
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
  useEffect(() => {
    if (domains) {
      const formatedData = domains.map((item: any) => ({
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
      setTableData(formatedData);
    }
  }, [domains]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl">Domines</div>
        <div className="flex gap-4 items-center">
          <SearchDomain data={domains} setTableData={setTableData} />
          <Button type="primary" onClick={() => setIsDrawerOpen(true)}>
            Add Domain
          </Button>
        </div>
      </div>

      <EditDomain
        isDrawerOpen={isEditDrawerOpen}
        onDrawerClose={() => setIsEditDrawerOpen(false)}
        selectedDomain={selectedDomain}
        callBack={refetch}
      />
      <CreateDomain
        isDrawerOpen={isDrawerOpen}
        onDrawerClose={onDrawerClose}
        callBack={refetch}
      />
      <Table
        loading={isLoading}
        dataSource={tableData}
        columns={columns}
        pagination={tablePagination}
        onChange={handleTableChange}
      />
    </div>
  );
}
