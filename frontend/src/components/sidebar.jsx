import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col">

            {/* Logo */}
            <div className="h-16 flex items-center justify-center border-b border-slate-700">
                <h1 className="text-2xl font-bold">
                    AsherDn
                </h1>
            </div>

            {/* Menu */}
            <nav className="flex-1 flex flex-col items-center gap-3 pt-6">

                <NavLink to="/">Home</NavLink>

                {token && (
                    <>
                        <NavLink to="/dashboard">
                            Dashboard
                        </NavLink>
                        
                        <NavLink to="/allUser">
                            Leave Requests
                        </NavLink>

                        <NavLink to="/request">
                            Register Requests
                        </NavLink>

                        <NavLink to="/attendace">
                           Attendance Report
                        </NavLink>
                    </>
                )}

            </nav>

            {/* Bottom Button */}
            <div className="flex justify-center mb-5">

                {token ? (
                    <button
                        onClick={logout}
                        className="bg-red-600 px-5 py-2 rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                ) : (
                    <NavLink
                        to="/login"
                        className="bg-blue-600 px-5 py-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </NavLink>
                )}

            </div>

        </aside>
    );
};

export default Sidebar;