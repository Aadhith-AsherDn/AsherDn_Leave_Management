import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Calendar from "../components/Calendar";
import Login from "../pages/login";
import Register from "../pages/signin";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Calendar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signin" element={<Register />} />
        </Route>

        
          
          

          

       
        

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;