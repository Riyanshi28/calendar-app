import React, { useState } from "react";
import "./Event.css";

const Event = ({ onAddEvent, closeEventForm }) => {
  const [eventTitle, setEventTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventTitle.trim()) {
      onAddEvent(eventTitle);
      closeEventForm(); // Close the form after adding an event
      setEventTitle(""); // Reset the input field
    }
  };

  return (
    <div className="event-container">
      <form onSubmit={handleSubmit} className="event-form">
        <h3>Add Event</h3>
        <input
          type="text"
          placeholder="Event Title"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="event-input"
        />
        <div className="event-actions">
          <button type="submit" className="event-button add-button">
            Add
          </button>
          <button type="button" onClick={closeEventForm} className="event-button cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Event;
