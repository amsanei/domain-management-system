import { Domain } from "../types";
import { LinkOutlined } from "@ant-design/icons";
import { Typography, Tooltip, Tag } from "antd";
import StatusIndicator from "../components/ui/StatusIndicator";

export const formatDomainTableData = (data: Domain[]) => {
  return data?.slice().map((item) => ({
    key: item.id,
    id: item.id,
    domainUrl: item.domain,
    domain: renderDomainUrlTag(item.isActive, item.domain),
    createdDate: renderDate(item.createdDate),
    isActive: renderActiveTag(item.isActive),
    status: renderStatusTag(item.status),
    isVerified: item.status === "verified",
  }));
};

const renderDate = (timeStamp: number) => {
  const date = new Date(Number(timeStamp)).toLocaleString();
  if (date === "Invalid Date") return "-";
  return date;
};

const renderDomainUrlTag = (isActive: boolean, domain: string) => {
  return (
    <div className="flex gap-1 items-baseline">
      <StatusIndicator isActive={isActive} />
      <span>{domain}</span>
      <Tooltip title="Open URL">
        <Typography.Link type="secondary" href={domain} target="_blank">
          <LinkOutlined />
        </Typography.Link>
      </Tooltip>
    </div>
  );
};

const renderActiveTag = (isActive: boolean) => {
  return isActive.toString() === "true" ? (
    <Tag color="success">Active</Tag>
  ) : (
    <Tag color="default">Inactive</Tag>
  );
};

const renderStatusTag = (status: string) => {
  const color =
    status === "verified"
      ? "success"
      : status === "pending"
      ? "warning"
      : "error";
  return <Tag color={color}>{status}</Tag>;
};
