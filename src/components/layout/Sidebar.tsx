import {
  LineChartOutlined,
  LinkOutlined,
  SettingOutlined,
  TagsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UserImage from '../../assets/user.jpg'

export default function Sidebar() {
  return (
    <div className="col-span-2 px-4 py-8 flex flex-col justify-between sticky top-0 max-h-screen">
        <div className="flex gap-2 items-center border-b border-neutral-200 pb-4 mb-4">
          <div className="rounded bg-white size-8 shadow flex items-center justify-center">
            11
          </div>
          <div>DMS</div>
        </div>
        <div className="flex flex-col gap-4 ps-4">
          <div className="flex gap-2 items-center">
            <LinkOutlined />
            <span>Domains</span>
          </div>
          <div className="flex gap-2 items-center">
            <UserOutlined />
            <span>Users</span>
          </div>
          <div className="flex gap-2 items-center">
            <LineChartOutlined />
            <span>Setictics</span>
          </div>
          <div className="flex gap-2 items-center">
            <TagsOutlined />
            <span>Tags</span>
          </div>
          <div className="flex gap-2 items-center">
            <SettingOutlined />
            <span>Settings</span>
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex gap-2">
          <img src={UserImage} alt="User Profile pic" className="rounded-full size-12" />
          <div className="flex flex-col ">
            <span className="text-sm text-neutral-500">welcaome</span>
            <span>Amir Mohammad</span>
          </div>
          </div>
        </div>
      </div>
  )
}
