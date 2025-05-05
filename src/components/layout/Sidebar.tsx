import { Typography } from "antd";
import UserImage from "../../assets/user.jpg";
import ThemeSwicher from "../ui/ThemeSwicher";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  return (
    <div className="hidden md:flex col-span-2 ps-4 py-8 flex-col justify-between sticky top-0 max-h-screen">
      <div className="flex justify-between items-center border-b border-neutral-200 dark:border-neutral-700 pb-4 mb-4">
        <div className="flex gap-2 items-center">
          <div className="rounded bg-white dark:bg-black dark:text-white size-8 shadow flex items-center justify-center">
            11
          </div>
          <Typography.Text>DMS</Typography.Text>
        </div>
        <div>
          <ThemeSwicher />
        </div>
      </div>
      <SidebarNav />
      <div className="mt-auto">
        <div className="flex gap-2">
          <img
            src={UserImage}
            alt="User Profile pic"
            className="rounded-full size-12"
          />
          <div className="flex flex-col ">
            <Typography.Text type="secondary">welcaome</Typography.Text>
            <Typography.Text>Amir Mohammad</Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
}
