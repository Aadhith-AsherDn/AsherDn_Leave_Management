import { useEffect, useState } from "react";

const AttendanceCard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all leave requests
  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);

      const response = await getAllLeaves();

      // If backend returns:
      // res.json(allLeaves)
      setLeaveRequests(response.data);

      // If backend returns:
      // { success: true, data: allLeaves }
      // setLeaveRequests(response.data.data);

    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);

      alert("Leave Approved");

      fetchLeaveRequests();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);

      alert("Leave Rejected");

      fetchLeaveRequests();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (loading) {
    return (
      <div className="mt-5 text-center text-lg">
        Loading Leave Requests...
      </div>
    );
  }

  return (
    <div className="mt-5 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Attendance
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Employee Name</th>
              <th className="px-4 py-3 text-left">Punch In</th>
              <th className="px-4 py-3 text-left">Punch Out</th>
              <th className="px-4 py-3 text-left">Total time</th>
            </tr>
          </thead>

          <tbody>
            {leaveRequests.length > 0 ? (
              leaveRequests.map((leave) => (
                <tr
                  key={leave._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    {leave.userEmail}
                  </td>

                  <td className="px-4 py-3">
                    {leave.leaveType}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(leave.fromDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(leave.toDate).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    {leave.reason}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : leave.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleApprove(leave._id)}
                        disabled={leave.status !== "Pending"}
                        className={`px-4 py-2 rounded-lg text-white ${
                          leave.status === "Pending"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(leave._id)}
                        disabled={leave.status !== "Pending"}
                        className={`px-4 py-2 rounded-lg text-white ${
                          leave.status === "Pending"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  No Leave Requests Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceCard;