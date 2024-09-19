import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import GenreList from '../components/GenreList';
import InfoCard from '../components/InfoCard';
import styles from '../styles/Home.module.css';

const DeveloperPage = () => {
  const [developers, setDevelopers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const URL = `https://api.rawg.io/api/developers?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page_size=10`;
        const response = await fetch(URL);
        if (!response.ok) throw new Error('Failed to fetch developers');
        const data = await response.json();
        setDevelopers(data.results);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching developers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <GenreList onGenreSelect={() => {}} /> {/* Placeholder */}
        <div className={styles.gameList}>
          {loading && <div>Loading developers...</div>}
          {error && <div>Error: {error}</div>}

          {developers.map((developer) => (
            <InfoCard
              key={developer.id}
              name={developer.name}
              image={developer.image_background || '/default-image.jpg'}
              developerId={developer.id}
              gamesCount={developer.games_count || 0} // Pass games count directly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperPage;
