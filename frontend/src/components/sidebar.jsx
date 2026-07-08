import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        <h1 className="text-2xl font-bold">AsherDn</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col items-center gap-3 pt-6">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/signin">Register</NavLink>
      </nav>

      {/* Login Button */}
      <nav className="flex flex-col items-center mb-5">
        <NavLink to="/login">Login</NavLink>
      </nav>

    </aside>
  );
};

export default Sidebar;