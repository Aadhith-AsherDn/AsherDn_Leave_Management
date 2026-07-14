function registerRequests(){
  const leaveRequests = [
    {
      id: 1,
      employee: "John Doe",
      leaveType: "Paid",
      fromDate: "12-07-2026",
      toDate: "14-07-2026",
      reason: "Family Function",
      status: "Pending",
    },
    {
      id: 2,
      employee: "Rahul",
      leaveType: "Sick",
      fromDate: "18-07-2026",
      toDate: "19-07-2026",
      reason: "Fever",
      status: "Pending",
    },
  ];

  return (
    <div className="mt-5 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Register Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Employee ID</th>
              <th className="px-4 py-3 text-left">Employee Name</th>
              <th className="px-4 py-3 text-left">Employee Email</th>
              <th className="px-4 py-3 text-left">Phone Number</th>
              <th className="px-4 py-3 text-left">Role</th> 
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {leaveRequests.map((leave) => (
              <tr
                key={leave.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{leave.employee}</td>

                <td className="px-4 py-3">{leave.leaveType}</td>

                <td className="px-4 py-3">{leave.fromDate}</td>

                <td className="px-4 py-3">{leave.toDate}</td>

                <td className="px-4 py-3">{leave.reason}</td>

                

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Approve
                    </button>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default registerRequests;