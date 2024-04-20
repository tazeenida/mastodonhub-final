import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function ArtEvents() {

  const handleAddToCalendar = (ArtEvents) => {
    // Load calendar events from local storage
    const storedEvents = localStorage.getItem('calendarEvents');
    const events = storedEvents ? JSON.parse(storedEvents) : [];

    // Check if the event title already exists in the calendarEvents array
    const isDuplicate = events.some((e) => e.title === ArtEvents.title);

    // If the event title already exists, display a message and return
    if (isDuplicate) {
      alert('Event already added to calendar.');
      return;
    }

    // Otherwise, add the event to the calendarEvents array
    events.push(ArtEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  };

  const handleRemoveFromCalendar = (eventTitle) => {
    // Remove the event from the calendarEvents array
    const storedEvents = localStorage.getItem('calendarEvents');
    const events = storedEvents ? JSON.parse(storedEvents) : [];
    const updatedEvents = events.filter((e) => e.title !== eventTitle);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
  };

  const [ArtEvents, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/mastodonhub/events/");
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
  const filteredArtEvents = ArtEvents.filter((event) => event.Category === 'Art');
  return (
    <div>
      <section id="ArtEvents">
        <h1>Art Events</h1>
        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black' }} className="event-images">
        <div id="Events-container" style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black' }} className="event-images">
          {filteredArtEvents.map((ArtEvents) => (
            <Link className="Events-item">
              <img className="event-images" src={ArtEvents.ImageUrl} alt="Event" />
                <div className="event-title">{ArtEvents.Title}</div>
              <div className="event-date">{ArtEvents.Date}</div>
              <div className="event-description">{ArtEvents.Description}</div>
              <div className="event-time">{ArtEvents.StartTime} - {ArtEvents.EndTime}</div>
              <div className="event-location">{ArtEvents.Location}</div>
              <button onClick={() => handleAddToCalendar(ArtEvents)} style={{ marginRight: '5px' }}>Add to Calendar</button>
              <button onClick={() => handleRemoveFromCalendar(ArtEvents.title)}>Remove from Calendar</button>
            </Link>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
}

export default ArtEvents;
