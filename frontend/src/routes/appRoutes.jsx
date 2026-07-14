import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Calendar from "../components/Calendar";
import Login from "../pages/login";
import Register from "../pages/signin";
import ForgetPassword from "../pages/forgetPassword"
import Request from "../pages/request";
import LeaveUpdateStatus from "../pages/allUser";
import AttendanceReport from "../pages/attendaceReport";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
                
      <Route path="/login" element={<Login />} />
      <Route path="/sigin" element={<Register />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Calendar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/allUser" element={<LeaveUpdateStatus />} />
          <Route path="/request" element={<Request />} />
          <Route path="/attendace" element={<AttendanceReport />} />
          
          
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;