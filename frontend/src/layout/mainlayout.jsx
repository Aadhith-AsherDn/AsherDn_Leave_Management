import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="ml-64 mt-16 p-6">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;