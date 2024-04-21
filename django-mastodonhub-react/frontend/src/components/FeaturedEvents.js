import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FeatureModal from './FeatureModal';

function FeaturedEvents() {
  const [FeaturedEvents, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeItem, setActiveItem] = useState({});
  const [modal, setModal] = useState(false);

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

  const handleFeatureClick = (FeaturedEvents) => {
    console.log('Opening modal for', FeaturedEvents);
    setActiveItem(FeaturedEvents);
    setModal(true);
  };
  
  const generateICalEvent = (event) => {
    const { Title, Date: eventDate, StartTime, EndTime, Location, Description } = event;
  
    // Validate event date and times
    if (!eventDate || !StartTime || !EndTime) {
      throw new Error("Invalid date or time values");
    }
  
    const startDateTime = new Date(`${eventDate}T${StartTime}`);
    const endDateTime = new Date(`${eventDate}T${EndTime}`);
  
    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      throw new Error("Invalid date object created");
    }
  
    // Format dates to be used in iCal
    const formatDate = (date) => {
      // Ensure times are in UTC and formatted correctly
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
  
    return `BEGIN:VCALENDAR
  VERSION:2.0
  PRODID:-//MastodonHub
  BEGIN:VEVENT
  UID:${new Date().toISOString()}
  DTSTAMP:${formatDate(new Date())}
  DTSTART:${formatDate(startDateTime)}
  DTEND:${formatDate(endDateTime)}
  SUMMARY:${Title}
  DESCRIPTION:${Description}
  LOCATION:${Location}
  END:VEVENT
  END:VCALENDAR`;
  };
  
  const downloadICalEvent = (fileName, icalData) => {
    const blob = new Blob([icalData], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleDownloadCalendar = (event) => {
    const icalData = generateICalEvent(event);
    downloadICalEvent(`${event.Title}.ics`, icalData);
  };

  const filteredFeaturedEvents = FeaturedEvents.filter((event) => event.Category === 'Featured');
  
  return (
    <div>
      <h1 class="event-title">Featured Events</h1>
      <section id="FeaturedEvents">
        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'black' }} className="event-images">
          {filteredFeaturedEvents.map((FeaturedEvents) => (
            <Link className="featured-event-link"  onClick={() => handleFeatureClick(FeaturedEvents)}>
              <img className="event-images" src={FeaturedEvents.ImageUrl} alt="Event" />
              <div className="event-title">{FeaturedEvents.Title}</div>
              <button onClick={() => handleDownloadCalendar(FeaturedEvents)}>Add to Calendar</button>
            </Link>
          ))}
          <FeatureModal isOpen={modal} toggle={() => setModal(false)} activeItem={activeItem} />
        </div>

      </section>
    </div>
  );
}

export default FeaturedEvents;
