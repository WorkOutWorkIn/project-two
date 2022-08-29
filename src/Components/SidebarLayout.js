import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const SidebarLayout = () => {
  <>
    <Sidebar />
    <Outlet />
  </>;
};

export default SidebarLayout;
