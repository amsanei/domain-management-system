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
import FilterDomains from "./FilterDomains";
import Sort from "./Sort";

const { Link } = Typography;

export default function DomainsList() {
  const { data: domains, isLoading, refetch } = useGetDomainsQuery({});
  const [tableData, setTableData] = useState<any>([]);

  const formatData = (data: Domain[]) => {
    const sortedData = data?.slice().sort((a, b) => {
      return (
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
    });
    setTableData(
      sortedData?.map((item: Domain) => ({
        key: item.id,
        id: item.id,
        domin: (
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
        createdDate: new Date(item.createdDate).toLocaleString(),
        isActive: item.isActive ? (
          <Tag color="success">Active</Tag>
        ) : (
          <Tag color="default">Not Active</Tag>
        ),
        status: (
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
      }))
    );
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
      dataIndex: "domin",
      key: "domin",
    },
    {
      title: "Active Status",
      dataIndex: "isActive",
      key: "isActive",
    },
    {
      title: "Verification Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdDate",
      key: "createdDate",
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
      formatData(domains);
    }
  }, [domains]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl">Domines</div>
        <div className="flex gap-4 items-center">
          <SearchDomain data={domains} formatData={formatData} />
          <Sort data={domains} formatData={formatData} />
          <FilterDomains data={domains} formatData={formatData} />
          <CreateDomain callBack={refetch} />
        </div>
      </div>
      <DataTable
        isLoading={isLoading}
        dataSource={tableData}
        columns={columns}
      />
    </div>
  );
}
