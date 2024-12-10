import React, { useState } from "react";
import "./Calendar.css";
import Day from "./Day";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const daysInMonth = endOfMonth.getDate();
  const startDay = startOfMonth.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const addEvent = (day, event) => {
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
    setEvents({
      ...events,
      [key]: [...(events[key] || []), event],
    });
  };

  const renderDays = () => {
    const totalDays = [];
    const totalSlots = 42; // 6 rows x 7 days

    // Days from the previous month
    const prevMonthDays = startDay;
    const prevMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    for (let i = prevMonthDays - 1; i >= 0; i--) {
      totalDays.push(
        <Day
          key={`prev-${i}`}
          day={prevMonthEnd - i}
          isCurrentMonth={false}
          events={[]}
          currentDate={currentDate}
        />
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${i}`;
      totalDays.push(
        <Day
          key={`current-${i}`}
          day={i}
          isCurrentMonth={true}
          events={events[key] || []}
          onAddEvent={(event) => addEvent(i, event)}
          currentDate={currentDate}
        />
      );
    }

    // Days from the next month
    const nextMonthDays = totalSlots - totalDays.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      totalDays.push(
        <Day
          key={`next-${i}`}
          day={i}
          isCurrentMonth={false}
          events={[]}
          currentDate={currentDate}
        />
      );
    }

    return totalDays;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>Previous</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div className="calendar-grid">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
