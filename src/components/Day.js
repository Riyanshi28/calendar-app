import React, { useState } from "react";
import Event from "./Event";
import "./Day.css";

const Day = ({ day, isCurrentMonth, events, onAddEvent, currentDate }) => {
  const [isEventFormVisible, setEventFormVisible] = useState(false);

  const toggleEventForm = () => {
    setEventFormVisible(!isEventFormVisible);
  };

  // Get today's date to compare
  const today = new Date();
  const isToday = isCurrentMonth && today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

  return (
    <div
      className={`day-container ${isCurrentMonth ? "current-month" : "outside-month"} ${isToday ? "current-day" : ""}`}
    >
      <div className="day-header">
        <span>{day}</span>
        {isCurrentMonth && (
          <button onClick={toggleEventForm} className="add-event-button">
            +
          </button>
        )}
      </div>
      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-item">
            {event}
          </div>
        ))}
      </div>
      {isEventFormVisible && (
        <Event onAddEvent={onAddEvent} closeEventForm={toggleEventForm} />
      )}
    </div>
  );
};

export default Day;
