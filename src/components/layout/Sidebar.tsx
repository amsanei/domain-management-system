
import UserImage from "../../assets/user.jpg";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  return (
    <div className="hidden md:flex col-span-2 px-4 py-8 flex-col justify-between sticky top-0 max-h-screen">
      <div className="flex gap-2 items-center border-b border-neutral-200 pb-4 mb-4">
        <div className="rounded bg-white size-8 shadow flex items-center justify-center">
          11
        </div>
        <div>DMS</div>
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
            <span className="text-sm text-neutral-500">welcaome</span>
            <span>Amir Mohammad</span>
          </div>
        </div>
      </div>
    </div>
  );
}
