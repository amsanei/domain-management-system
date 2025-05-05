import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" bg-neutral-100 min-h-screen">
      <Header />
      <div className="grid grid-cols-12">
        <Sidebar />
        <div className="col-span-12 md:col-span-10 p-4 md:p-8">
          <div className="bg-white rounded-xl p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
