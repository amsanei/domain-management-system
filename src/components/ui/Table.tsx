import { Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { useState } from "react";
import { TableData } from "../../types";

export default function DataTable({
  isLoading,
  dataSource,
  columns,
}: {
  isLoading: boolean;
  dataSource: TableData[];
  columns: ColumnsType<TableData>;
}) {
  const [tablePagination, setTablePagination] = useState<TablePaginationConfig>(
    {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ["5", "10", "20", "50"],
    }
  );
  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTablePagination((prev) => ({
      ...prev,
      current: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };
  return (
    <Table
      scroll={{ x: 900 }}
      loading={isLoading}
      dataSource={dataSource}
      columns={columns}
      pagination={tablePagination}
      onChange={handleTableChange}
    />
  );
}
