import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  LineChartOutlined,
  LinkOutlined,
  SettingOutlined,
  TagsOutlined,
  UserOutlined,
} from "@ant-design/icons";

import UserImage from './assets/user.jpg'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="grid grid-cols-12 bg-neutral-100 min-h-screen">
      <div className="col-span-2 px-4 py-8 flex flex-col justify-between">
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
      <div className="col-span-10 p-8">
        <div className="bg-white rounded-xl p-4">
          <App />
        </div>
      </div>
    </div>
  </StrictMode>
);
