import { Dropdown, MenuProps, Typography } from "antd";
import { useGetDomainsQuery } from "../state/domains/domainsApiSlice";
import { useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import SearchDomain from "./SearchDomain";
import CreateDomain from "./CreateDomain";
import EditDomain from "./EditDomain";
import DestroyDomain from "./DestroyDomain";
import { Domain } from "../types";
import DataTable from "./ui/Table";
import FilterDomains from "./FilterDomains";
import Sort from "./Sort";
import { formatDomainTableData } from "../utils/formatDomainTableData";
import ErrorBox from "./layout/ErrorBox";

const { Text } = Typography;

export default function DomainsList() {
  const {
    data: domains,
    isLoading,
    refetch,
    isError,
    isFetching,
  } = useGetDomainsQuery();
  const [tableData, setTableData] = useState<any>([]);

  const formatData = (data: Domain[]) => {
    const tableData = formatDomainTableData(data);
    setTableData(tableData);
  };

  const actionMenuItems = (id: number, domain: string): MenuProps["items"] => [
    {
      key: "edit",
      label: <EditDomain domainId={id} callBack={refetch} />,
    },
    {
      key: "delete",
      danger: true,
      label: <DestroyDomain id={id} domain={domain} callBack={refetch} />,
    },
  ];

  const columns = [
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
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
      render: (_: any, record: Domain & { domainUrl: string }) => (
        <Dropdown
          trigger={["click"]}
          menu={{ items: actionMenuItems(record.id, record.domainUrl) }}
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
      <div className="flex flex-col gap-4 md:flex-row justify-between items-center mb-4">
        <Text style={{ fontSize: "1.5rem" }}>Domains</Text>
        {!isError && (
          <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
            <SearchDomain callBack={formatData} />
            <Sort callBack={formatData} />
            <FilterDomains callBack={formatData} />
            <CreateDomain callBack={refetch} />
          </div>
        )}
      </div>
      {isError ? (
        <ErrorBox action={refetch} />
      ) : (
        <DataTable
          isLoading={isLoading || isFetching}
          dataSource={tableData}
          columns={columns}
        />
      )}
    </div>
  );
}
