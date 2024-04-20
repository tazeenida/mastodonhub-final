import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function SportsEvents() {

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

  const [SportsEvents, setEvents] = useState([]);
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
  const filteredSportsEvents = SportsEvents.filter((event) => event.Category === 'Sports');
  return (
    <div>
      <section id="SportsEvents">
        <h1>Sports Events</h1>
        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black' }} className="event-images">
        <div id="Events-container" style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black' }} className="event-images">
          {filteredSportsEvents.map((SportsEvents) => (
            <Link className="Events-item">
              <img className="event-images" src={SportsEvents.ImageUrl} alt="Event" />
                <div className="event-title">{SportsEvents.Title}</div>
              <div className="event-date">{SportsEvents.Date}</div>
              <div className="event-description">{SportsEvents.Description}</div>
              <div className="event-time">{SportsEvents.StartTime} - {SportsEvents.EndTime}</div>
              <div className="event-location">{SportsEvents.Location}</div>
              <button onClick={() => handleAddToCalendar(SportsEvents)} style={{ marginRight: '5px' }}>Add to Calendar</button>
              <button onClick={() => handleRemoveFromCalendar(SportsEvents.title)}>Remove from Calendar</button>
            </Link>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
}

export default SportsEvents;
