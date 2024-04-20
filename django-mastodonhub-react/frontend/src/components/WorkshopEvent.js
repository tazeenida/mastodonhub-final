import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function WorkshopEvents() {

  const handleAddToCalendar = (event) => {
    // Load calendar events from local storage
    const storedEvents = localStorage.getItem('calendarEvents');
    const events = storedEvents ? JSON.parse(storedEvents) : [];

    // Check if the event title already exists in the calendarEvents array
    const isDuplicate = events.some((e) => e.title === event.title);

    // If the event title already exists, display a message and return
    if (isDuplicate) {
      alert('Event already added to calendar.');
      return;
    }

    // Otherwise, add the event to the calendarEvents array
    events.push(event);
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  };

  const handleRemoveFromCalendar = (eventTitle) => {
    // Remove the event from the calendarEvents array
    const storedEvents = localStorage.getItem('calendarEvents');
    const events = storedEvents ? JSON.parse(storedEvents) : [];
    const updatedEvents = events.filter((e) => e.title !== eventTitle);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  };

  const [WorkshopEvents, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/mastodonhub/events/");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const filteredWorkshopEvents = WorkshopEvents.filter((event) => event.Category === 'Workshops');
  return (
    <div>
      <section id="WorkshopEvents">
        <h1>Workshops Events</h1>
        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black' }} className="event-images">
        <div id="Events-container" style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black' }} className="event-images">
          {filteredWorkshopEvents.map((WorkshopEvents) => (
            <Link className="Events-item">
              <img className="event-images" src={WorkshopEvents.ImageUrl} alt="Event" />
                <div className="event-title">{WorkshopEvents.Title}</div>
              <div className="event-date">{WorkshopEvents.Date}</div>
              <div className="event-description">{WorkshopEvents.Description}</div>
              <div className="event-time">{WorkshopEvents.StartTime} - {WorkshopEvents.EndTime}</div>
              <div className="event-location">{WorkshopEvents.Location}</div>
              <button onClick={() => handleAddToCalendar(WorkshopEvents)} style={{ marginRight: '5px' }}>Add to Calendar</button>
              <button onClick={() => handleRemoveFromCalendar(WorkshopEvents.title)}>Remove from Calendar</button>
            </Link>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
}

export default WorkshopEvents;
