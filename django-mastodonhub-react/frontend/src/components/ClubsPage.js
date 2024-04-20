import React, { useState, useEffect } from "react";
import axios from "axios";
import ClubModal from "./clubsModal"; // Import ClubModal component

const ClubsPage = () => {
  const [clubList, setClubList] = useState([]);
  const [activeItem, setActiveItem] = useState({});
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get("/api/mastodonhub/clubs/");
        setClubList(response.data);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, []);

  // Function to handle club item click and set active item for modal
  const handleClubClick = (club) => {
    setActiveItem(club);
    setModal(true);
  };

  return (
    <main className="container">
    
      <h1>ClubRec</h1>
      {isLoading && <p>Loading clubs...</p>}
      {error && <p>Error fetching clubs: {error.message}</p>} 
      <div>
        <ul>
          {clubList.map((item) => (
            <li
              key={item.id}
              className="club-container"
              onClick={() => handleClubClick(item)}
            >
              <div>{item.Title}</div>
              <img className="event-images" src={item.ImageUrl} alt="Event" />
              
            </li>
          ))}
        </ul>
      
      <ClubModal isOpen={modal} toggle={() => setModal(false)} activeItem={activeItem} />
      </div>
    </main>
  );
};

export default ClubsPage;
