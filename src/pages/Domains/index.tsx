import { Dropdown, MenuProps, Typography } from "antd";
import { useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import Search from "./Search";
import Filter from "./Filter";
import Sort from "./Sort";
import Verify from "./Verify";
import Create from "./Create";
import { useGetDomainsQuery } from "../../state/domains/domainsApiSlice";
import { Domain } from "../../types";
import { formatDomainTableData } from "../../utils/formatDomainTableData";
import ErrorBox from "../../components/layout/ErrorBox";
import DataTable from "../../components/ui/Table";
import Destroy from "./Destroy";
import Edit from "./Edit";
import sortData from "../../utils/sortData";
import filterData from "../../utils/filterData";
import searchData from "../../utils/searchData";

const { Text } = Typography;

export default function DomainsPage() {
  const {
    data: domains,
    isLoading,
    refetch,
    isError,
    isFetching,
  } = useGetDomainsQuery();
  const [tableData, setTableData] = useState<any>([]);
  const [filters, setFilters] = useState<{
    isActive: string[];
    status: string[];
  }>({
    isActive: [],
    status: [],
  });
  const [sortMethod, setSortMethod] = useState("latest");
  const [searchTerm, setSearchTerm] = useState("");
  const formatData = (data: Domain[]) => {
    const newTableData = formatDomainTableData(data);
    setTableData(newTableData);
  };

  const actionMenuItems = (
    id: number,
    isVerified: boolean,
    domain: string
  ): MenuProps["items"] => [
    {
      key: "edit",
      label: <Edit domainId={id} callBack={refetch} />,
    },
    {
      key: "verifiy",
      label: <Verify domainId={id} domain={domain} callBack={refetch} />,
      disabled: isVerified,
    },
    {
      key: "delete",
      danger: true,
      label: <Destroy id={id} domain={domain} callBack={refetch} />,
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
      render: (
        _: any,
        record: Domain & { domainUrl: string; isVerified: boolean }
      ) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: actionMenuItems(
              record.id,
              record.isVerified,
              record.domainUrl
            ),
          }}
        >
          <EllipsisOutlined />
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    if (domains) {
      let result = filterData(filters, domains);
      result = sortData(sortMethod, result);
      result = searchData(searchTerm, result);
      formatData(result);
    }
  }, [domains, filters, sortMethod, searchTerm]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row justify-between items-center mb-4">
        <Text style={{ fontSize: "1.5rem" }}>Domains</Text>
        {!isError && (
          <div className="flex flex-wrap md:flex-nowrap gap-4 items-center">
            <Search setTerm={setSearchTerm} />
            <Sort setSortMethod={setSortMethod} />
            <Filter setFilters={setFilters} />
            <Create callBack={refetch} />
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
