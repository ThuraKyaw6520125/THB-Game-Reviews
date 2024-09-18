// pages/publisher.js

import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import GenreList from '../components/GenreList';
import InfoCard from '../components/InfoCard';
import styles from '../styles/Home.module.css'; // Assuming similar styling

const PublisherPage = () => {
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const URL = `https://api.rawg.io/api/publishers?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page_size=10`;
        const response = await fetch(URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setPublishers(data.results);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching publishers:', error);
      }
    };

    fetchPublishers();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <GenreList onGenreSelect={() => {}} />
        <div className={styles.gameList}>
          {error && <div>Error: {error}</div>}
          {publishers.map((publisher) => (
            <InfoCard
              key={publisher.id}
              name={publisher.name}
              image={publisher.image_background || '/default-image.jpg'} // Fallback image if none
              description={publisher.description || 'No description available'}
              popularGame={publisher.popular_game || 'N/A'} // Assuming you get this data
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublisherPage;
