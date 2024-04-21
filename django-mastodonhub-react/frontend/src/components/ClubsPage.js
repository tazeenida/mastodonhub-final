import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ClubModal from './clubsModal';
import ClubsFilter from './clubsFilter';
import '../styles.css';

function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeItem, setActiveItem] = useState({});
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchClubs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/mastodonhub/clubs/');
        setClubs(response.data);
        setFilteredClubs(response.data); // Default to all clubs
      } catch (error) {
        setError(error);
        console.error('Error fetching clubs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const handleFilterChange = (selectedCategory, searchTerm) => {
    let filtered = clubs;

    if (selectedCategory) {
      filtered = filtered.filter((club) => club.Category === selectedCategory);
    }

    if (searchTerm && searchTerm.trim() !== '') {
      filtered = filtered.filter((club) =>
        club.Title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredClubs(filtered); // Update the filtered list based on filters
  };

  const handleClubsClick = (club) => {
    console.log('Opening modal for', club);
    setActiveItem(club);
    setModal(true);
  };

  return (
    <main>
      <section id="FeaturedEvents" className="featured-events-section">
      <ClubsFilter onFilterChange={handleFilterChange} />
        <header>
          <h1 className="club-title">Clubs</h1>
        </header>
        <section className="filtered-results">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <div id="Events-container">
              {filteredClubs.map((club) => (
                <Link key={club.id} className="Events-item" onClick={() => handleClubsClick(club)}>
                  <img
                    className="event-images"
                    src={club.ImageUrl}
                    alt={club.Title}
                    style={{ width: '200px', height: '200px' }}
                  />
                  <div className="event-title">{club.Title}</div>
                  <ClubModal isOpen={modal} toggle={() => setModal(false)} activeItem={activeItem} />
                </Link>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default ClubsPage;
