import { Table } from "antd";
import { useState } from "react";

export default function DataTable({ isLoading, dataSource, columns }: any) {
  console.log('here');
  
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
