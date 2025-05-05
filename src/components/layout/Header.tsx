import { MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import UserImage from "../../assets/user.jpg";
import { Button, Drawer } from "antd";
import { useState } from "react";
import SidebarNav from "./SidebarNav";
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
      <div className="md:hidden flex justify-between sticky top-0 border-b border-neutral-200 py-4 px-4 bg-white/70 backdrop-blur-lg">
        <div className="flex gap-2 items-center ">
          <div className="rounded bg-white size-8 shadow flex items-center justify-center">
            11
          </div>
          <div>DMS</div>
        </div>
        <div className="flex gap-2 items-center">
          <Button type="default" shape="circle" onClick={() => setIsOpen(true)}>
            <MenuOutlined />
          </Button>
          <Button type="default" shape="circle">
            {1 == 1 ? <SunOutlined /> : <MoonOutlined />}
          </Button>

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
