import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    // Force FullCalendar to recalc column widths after layout settles
    const timer = setTimeout(() => {
      calendarRef.current?.getApi().updateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDateClick = (info) => {
    const date = info.dateStr;
    const day = attendance.find((item) => item.date === date);
    setSelectedDay(day || { date, employees: [] });
  };

  return (
    <div className="w-full p-6 flex gap-6">
      <div className="w-full max-w-4xl bg-slate-00 rounded-xl p-5">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="75vh"
          dateClick={handleDateClick}
          headerToolbar={{ start: "prev,next", center: "title", end: "" }}
        />
      </div>
      {/* right panel unchanged */}
    </div>
  );
}