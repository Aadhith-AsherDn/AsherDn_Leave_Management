import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { attendance } from "../services/punchInOut";

export default function Calendar() {
  const calendarRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      calendarRef.current?.getApi().updateSize();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleDateClick = async (info) => {
    setSelectedDay(info.dateStr);
    setLoading(true);

    try {
      const data = await attendance(info.dateStr);

      setAttendanceData(data);
    } catch (err) {
      console.error(err);
      setAttendanceData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-6 p-6">

      {/* Calendar */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-5">

        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="75vh"
          dateClick={handleDateClick}
          headerToolbar={{
            start: "prev,next",
            center: "title",
            end: "",
          }}
        />

      </div>

      {/* Attendance Panel */}

      <div className="w-96 bg-white rounded-xl shadow-lg p-5 h-[75vh] overflow-y-auto">

        <h2 className="text-2xl font-bold mb-4">
          Attendance
        </h2>

        {!selectedDay ? (
          <p className="text-gray-500">
            Select a date to view attendance.
          </p>
        ) : loading ? (
          <p>Loading...</p>
        ) : attendanceData ? (
          <>
            {/* Date */}

            <div className="mb-5">

              <p className="font-semibold text-lg">
                {attendanceData.date}
              </p>

            </div>

            {/* Summary */}

            <div className="grid grid-cols-2 gap-3 mb-6">

              <div className="bg-green-100 rounded-lg p-4 text-center">
                <p className="text-green-700 font-bold text-2xl">
                  {attendanceData.presentCount}
                </p>
                <p className="text-sm">
                  Present
                </p>
              </div>

              <div className="bg-red-100 rounded-lg p-4 text-center">
                <p className="text-red-700 font-bold text-2xl">
                  {attendanceData.absentCount}
                </p>
                <p className="text-sm">
                  Absent
                </p>
              </div>

            </div>

            {/* Present Employees */}

            <div className="mb-6">

              <h3 className="font-bold text-green-700 mb-2">
                Present Employees
              </h3>

              {attendanceData.present.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No employees present.
                </p>
              ) : (
                attendanceData.present.map((emp) => (
                  <div
                    key={emp._id}
                    className="border rounded-lg p-3 mb-2"
                  >
                    <p className="font-semibold">
                      {emp.userName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {emp.userEmail}
                    </p>

                    <span className="inline-block mt-2 px-2 py-1 bg-green-500 text-white rounded text-xs">
                      {emp.role}
                    </span>
                  </div>
                ))
              )}

            </div>

            {/* Absent Employees */}

            <div>

              <h3 className="font-bold text-red-700 mb-2">
                Absent Employees
              </h3>

              {attendanceData.absent.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No employees absent.
                </p>
              ) : (
                attendanceData.absent.map((emp) => (
                  <div
                    key={emp._id}
                    className="border rounded-lg p-3 mb-2"
                  >
                    <p className="font-semibold">
                      {emp.userName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {emp.userEmail}
                    </p>

                    <span className="inline-block mt-2 px-2 py-1 bg-red-500 text-white rounded text-xs">
                      {emp.role}
                    </span>
                  </div>
                ))
              )}

            </div>
          </>
        ) : (
          <p className="text-red-500">
            Failed to load attendance.
          </p>
        )}
      </div>
    </div>
  );
}