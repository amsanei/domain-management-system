import { MenuOutlined } from "@ant-design/icons";
import UserImage from "../../assets/user.jpg";
import { Button, Drawer, Typography } from "antd";
import { useState } from "react";
import SidebarNav from "./SidebarNav";
import ThemeSwicher from "../ui/ThemeSwicher";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Drawer
        title="Domain Management System"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <SidebarNav />
      </Drawer>
      <div className="md:hidden flex justify-between sticky top-0 border-b border-neutral-200 dark:border-neutral-800 py-4 px-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg z-50">
        <div className="flex gap-2 items-center ">
          <div className="rounded bg-white dark:bg-black dark:text-white size-8 shadow flex items-center justify-center">
            11
          </div>
          <Typography.Text>DMS</Typography.Text>
        </div>
        <div className="flex gap-2 items-center">
          <Button type="default" shape="circle" onClick={() => setIsOpen(true)}>
            <MenuOutlined />
          </Button>
          <ThemeSwicher />
          <img
            src={UserImage}
            alt="User Profile pic"
            className="rounded-full size-8"
          />
        </div>
      </div>
    </>
  );
}
