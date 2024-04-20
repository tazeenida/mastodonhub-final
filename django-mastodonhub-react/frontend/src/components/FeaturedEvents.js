import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function FeaturedEvents() {

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

  const [FeaturedEvents, setEvents] = useState([]);
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
  const filteredFeaturedEvents = FeaturedEvents.filter((event) => event.Category === 'Featured');
  return (
    <div>
      <section id="FeaturedEvents">
        <h1>Featured Events</h1>
        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black' }} className="event-images">
          {filteredFeaturedEvents.map((FeaturedEvents) => (
            <Link className="featured-event-link">
              <img className="event-images" src={FeaturedEvents.ImageUrl} alt="Event" />
                <div className="event-title">{FeaturedEvents.Title}</div>
              <div className="event-date">{FeaturedEvents.Date}</div>
              <div className="event-description">{FeaturedEvents.Description}</div>
              <div className="event-time">{FeaturedEvents.StartTime} - {FeaturedEvents.EndTime}</div>
              <div className="event-location">{FeaturedEvents.Location}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FeaturedEvents;
