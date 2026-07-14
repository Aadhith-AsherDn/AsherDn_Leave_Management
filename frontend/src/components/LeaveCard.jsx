import { useState } from "react";
import { applyLeave } from "../services/leaveService";

function Leavecard() {
  const [leaveType, setUserLeaveType] = useState("");
  const [fromDate, setUserFromDate] = useState("");
  const [toDate, setUserToDate] = useState("");
  const [reason, setUserReason] = useState("");

  const handleLeaveCard = async (e) => {
    e.preventDefault();

    try {
      const response = await applyLeave({
        leaveType,
        fromDate,
        toDate,
        reason,
      });

      console.log(response);
      alert("Leave applied successfully!");
    } catch (error) {
      console.log(error.response?.data);
      alert("Leave Application Failed");
    }
  };

  return (
    <div className="w-130 mt-5 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Leave Application
        </h2>
        <p className="text-gray-500 mt-2">
          Fill in the details below to submit your leave request.
        </p>
      </div>

      <form onSubmit={handleLeaveCard} className="space-y-6">
        {/* Leave Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Leave Type
          </label>

          <select
            value={leaveType}
            onChange={(e) => setUserLeaveType(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Select Leave Type</option>
            <option value="Paid">Paid Leave</option>
            <option value="Sick">Sick Leave</option>
            <option value="Casual">Casual Leave</option>
          </select>
        </div>

        {/* Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setUserFromDate(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              To Date
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(e) => setUserToDate(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Reason
          </label>

          <textarea
            rows="4"
            value={reason}
            onChange={(e) => setUserReason(e.target.value)}
            placeholder="Please provide the reason for your leave..."
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300 shadow-md"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}

export default Leavecard;