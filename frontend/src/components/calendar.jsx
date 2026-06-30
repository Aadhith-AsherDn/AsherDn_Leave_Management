import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const attendance = [
  {
    date: "2026-06-16",
    present: 39,
    absent: 6,
    leave: 1,
    late: 2,
    employees: [
      { id: 1, name: "Rahul", status: "Absent" },
      { id: 2, name: "Arun", status: "Leave" },
      { id: 3, name: "Priya", status: "Absent" },
      { id: 4, name: "Kumar", status: "Absent" },
      { id: 5, name: "David", status: "Absent" },
      { id: 6, name: "John", status: "Late" },
    ],
  },
  {
    date: "2026-06-17",
    present: 43,
    absent: 2,
    leave: 0,
    late: 1,
    employees: [
      { id: 7, name: "Karthik", status: "Absent" },
      { id: 8, name: "Manoj", status: "Absent" },
      { id: 9, name: "Siva", status: "Late" },
    ],
  },
];

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState(null);

  const todayStats = attendance[0];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      

      <div className="grid grid-cols-12 gap-6">

        {/* Calendar */}

        <div className="col-span-8 bg-white rounded-xl shadow-lg p-5">

          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height="80vh"

            headerToolbar={{
              start: "prev,next today",
              center: "title",
              end: "dayGridMonth",
            }}

            dayCellDidMount={(info) => {

              const date = info.date.toISOString().split("T")[0];

              const data = attendance.find((d) => d.date === date);

              if (!data) return;

              if (data.absent >= 6)
                info.el.style.backgroundColor = "#FECACA";

              else if (data.absent >= 3)
                info.el.style.backgroundColor = "#FED7AA";

              else if (data.absent >= 1)
                info.el.style.backgroundColor = "#FEF3C7";

              else
                info.el.style.backgroundColor = "#DCFCE7";

              info.el.style.cursor = "pointer";

              info.el.onmouseenter = () => {
                setSelectedDay(data);
              };
            }}

            dayCellContent={(arg) => {

              const date = arg.date.toISOString().split("T")[0];

              const data = attendance.find((a) => a.date === date);

              return (
                <div className="p-1">

                  <div className="font-semibold">
                    {arg.dayNumberText}
                  </div>

                  {data && (

                    <div className="mt-2">

                      <div className="bg-red-500 text-white text-[11px] rounded-full w-fit px-2">

                        ❌ {data.absent}

                      </div>

                    </div>

                  )}

                </div>
              );
            }}
          />

        </div>

        {/* Right Panel */}

        <div className="col-span-4">

          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-5">

            {!selectedDay ? (

              <div className="text-center text-gray-500 mt-20">

                Hover over a date to view attendance.

              </div>

            ) : (

              <>
                <h2 className="text-2xl font-bold mb-2">

                  Attendance

                </h2>

                <p className="text-gray-500 mb-5">

                  {selectedDay.date}

                </p>

                <div className="space-y-3">

                  <Stat
                    label="Present"
                    value={selectedDay.present}
                    color="text-green-600"
                  />

                  <Stat
                    label="Absent"
                    value={selectedDay.absent}
                    color="text-red-600"
                  />

                  <Stat
                    label="Leave"
                    value={selectedDay.leave}
                    color="text-yellow-600"
                  />

                  <Stat
                    label="Late"
                    value={selectedDay.late}
                    color="text-blue-600"
                  />

                </div>

                <hr className="my-5" />

                <h3 className="font-bold mb-3">

                  Employee Status

                </h3>

                <div className="space-y-2 max-h-80 overflow-auto">

                  {selectedDay.employees.map((emp) => (

                    <div
                      key={emp.id}
                      className="flex justify-between bg-gray-100 rounded-lg p-3"
                    >
                      <span>{emp.name}</span>

                      <span
                        className={`font-semibold
                        ${
                          emp.status === "Absent"
                            ? "text-red-600"
                            : emp.status === "Leave"
                            ? "text-yellow-600"
                            : "text-blue-600"
                        }`}
                      >
                        {emp.status}
                      </span>

                    </div>

                  ))}

                </div>

              </>

            )}

          </div>

        </div>
        {/* Summary Cards */}
      <div className="flex flex-row">

        <Card
          title="Employees"
          value="45"
          color="bg-blue-500"
        />

        <Card
          title="Present"
          value={todayStats.present}
          color="bg-green-500"
        />

        <Card
          title="Absent"
          value={todayStats.absent}
          color="bg-red-500"
        />

        <Card
          title="Leave"
          value={todayStats.leave}
          color="bg-yellow-500"
        />

      </div>

      </div>

    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`${color} text-white rounded-xl p-5 shadow`}>
      <p className="text-sm basis-64">{title}</p>
      <h1 className="text-3xl font-bold mt-2">{value}</h1>
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="flex justify-between text-lg">
      <span>{label}</span>
      <span className={`font-bold ${color}`}>
        {value}
      </span>
    </div>
  );
}