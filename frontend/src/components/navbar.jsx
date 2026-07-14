import { useEffect, useState } from "react";
import {
  punchIn,
  punchOut,
  getTodayPunch,
} from "../services/punchInOut";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const [attendance, setAttendance] = useState({
    isPunchedIn: false,
    isPunchedOut: false,
    data: null,
  });

  const [loading, setLoading] = useState(false);

  // Load today's attendance when Navbar opens
  useEffect(() => {
    if (token) {
      loadTodayAttendance();
    }
  }, [token]);

  const loadTodayAttendance = async () => {
    try {
      const response = await getTodayPunch();
      setAttendance(response);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handlePunch = async () => {
    try {
      setLoading(true);

      if (!attendance.isPunchedIn) {
        await punchIn();
      } else if (!attendance.isPunchedOut) {
        await punchOut();
      }

      await loadTodayAttendance();

    } catch (error) {
      alert(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-slate-900 shadow-lg flex items-center justify-between px-8">

      {/* Left Side */}
      <div>
        <h1 className="text-xl font-semibold text-white">
         
        </h1>
      </div>

      {/* Right Side */}
      {token && (
        <div className="flex items-center gap-6">

          
          {/* Punch Button */}
          <button
            onClick={handlePunch}
            disabled={attendance.isPunchedOut || loading}
            className={`px-5 py-2 rounded-lg text-white font-semibold transition

            ${
              attendance.isPunchedOut
                ? "bg-gray-500 cursor-not-allowed"
                : attendance.isPunchedIn
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading
              ? "Please Wait..."
              : attendance.isPunchedOut
              ? "Completed"
              : attendance.isPunchedIn
              ? "Punch Out"
              : "Punch In"}
          </button>

        </div>
      )}
    </header>
  );
};

export default Navbar;