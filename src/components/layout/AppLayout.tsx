import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <div className={`bg-neutral-100 dark:bg-neutral-800 ${className}`}>
      <Header />
      <div className="grid grid-cols-12 min-h-screen">
        <Sidebar />
        <div className="col-span-12 md:col-span-10 p-4 md:p-8">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
