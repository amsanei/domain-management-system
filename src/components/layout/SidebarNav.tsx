import {
  LineChartOutlined,
  LinkOutlined,
  SettingOutlined,
  TagsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
const { Text } = Typography;
export default function SidebarNav() {
  return (
    <div className="flex flex-col gap-4 ps-4">
      <Text className="flex gap-2 items-center ">
        <LinkOutlined />
        <span>Domains</span>
      </Text>
      <Text className="flex gap-2 items-center" disabled>
        <UserOutlined />
        <span>Users</span>
      </Text>
      <Text className="flex gap-2 items-center" disabled>
        <LineChartOutlined />
        <span>Setictics</span>
      </Text>
      <Text className="flex gap-2 items-center" disabled>
        <TagsOutlined />
        <span>Tags</span>
       </Text>
      <Text className="flex gap-2 items-center" disabled>
        <SettingOutlined />
        <span>Settings</span>
       </Text>
    </div>
  );
}
