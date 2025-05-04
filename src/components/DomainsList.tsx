import { Dropdown, MenuProps, Tag, Tooltip, Typography } from "antd";
import { useGetDomainsQuery } from "../state/domains/domainsApiSlice";
import { useEffect, useState } from "react";
import { EllipsisOutlined, LinkOutlined } from "@ant-design/icons";
import SearchDomain from "./SearchDomain";
import CreateDomain from "./CreateDomain";
import EditDomain from "./EditDomain";
import DestroyDomain from "./DestroyDomain";
import StatusIndicator from "./ui/StatusIndicator";
import { Domain } from "../types";
import DataTable from "./ui/Table";

const { Link } = Typography;

export default function DomainsList() {
  const { data: domains, isLoading, refetch } = useGetDomainsQuery({});
  const [tableData, setTableData] = useState([]);

  const formatData = () => {
    return domains.map((item: Domain) => ({
      key: item.id,
      id: item.id,
      "domin-url": (
        <div className="flex gap-1 items-baseline">
          <StatusIndicator isActive={item.isActive} />
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
  };

  const actionMenuItems = (id: number): MenuProps["items"] => [
    {
      key: "edit",
      label: <EditDomain domainId={id} callBack={refetch} />,
    },
    {
      key: "delete",
      danger: true,
      label: <DestroyDomain id={id} callBack={refetch} />,
    },
  ];

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
      render: (_: any, record: Domain) => (
        <Dropdown
          trigger={["click"]}
          menu={{ items: actionMenuItems(record.id) }}
        >
          <EllipsisOutlined />
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    if (domains) {
      const formatedData = formatData();
      setTableData(formatedData);
    }
  }, [domains]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl">Domines</div>
        <div className="flex gap-4 items-center">
          <SearchDomain data={domains} setTableData={setTableData} />
          <CreateDomain callBack={refetch} />
        </div>
      </div>
      <DataTable loading={isLoading} dataSource={tableData} columns={columns} />
    </div>
  );
}
