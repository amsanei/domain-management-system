import { Domain } from "../types";
import {  LinkOutlined } from "@ant-design/icons";
import { Typography, Tooltip, Tag } from "antd";
import StatusIndicator from "../components/ui/StatusIndicator";

export const formatDomainTableData = (data: Domain[]) => {
  console.log(data);
  
  return data
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    )
    .map((item) => ({
      key: item.id,
      id: item.id,
      domainUrl : item.domain,
      domain: renderDomainUrlTag(item.isActive, item.domain),
      createdDate: new Date(item.createdDate).toLocaleString(),
      isActive: renderActiveTag(item.isActive),
      status: renderStatusTag(item.status),
    }));
};

const renderDomainUrlTag = (isActive: boolean, domain: string) => {
  return <div className="flex gap-1 items-baseline">
    <StatusIndicator isActive={isActive} />
    <span>{domain}</span>
    <Tooltip title="Open URL">
      <Typography.Link type="secondary" href={domain} target="_blank">
        <LinkOutlined />
      </Typography.Link>
    </Tooltip>
  </div>;
};

const renderActiveTag = (isActive: boolean) =>
  isActive ? (
    <Tag color="success">Active</Tag>
  ) : (
    <Tag color="default">Not Active</Tag>
  );

const renderStatusTag = (status: string) => {
  const color =
    status === "verified"
      ? "success"
      : status === "pending"
      ? "warning"
      : "error";
  return <Tag color={color}>{status}</Tag>;
};
