import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function ArtEvents() {

  const [ArtEvents, setEvents] = useState([]);
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
  
  const filteredArtEvents = ArtEvents.filter((event) => event.Category === 'Art');
  
  return (
    <div>
      <section id="ArtEvents">
        <h1>Art Events</h1>
        <div id="Events-container" style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black' }} className="event-images">
          {filteredArtEvents.map((ArtEvents) => (
            <Link className="Events-item">
              <img className="event-images" src={ArtEvents.ImageUrl} alt="Event" />
                <div className="event-title">{ArtEvents.Title}</div>
              <div className="event-date">{ArtEvents.Date}</div>
              <div className="event-description">{ArtEvents.Description}</div>
              <div className="event-time">{ArtEvents.StartTime} - {ArtEvents.EndTime}</div>
              <div className="event-location">{ArtEvents.Location}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ArtEvents;
