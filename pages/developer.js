import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/NavBar';
import GenreList from '../components/GenreList';
import InfoCard from '../components/InfoCard';
import styles from '../styles/Home.module.css';

const DeveloperPage = () => {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]); // New state for filtered developers
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const URL = `https://api.rawg.io/api/developers?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page_size=30`;
        const response = await fetch(URL);
        if (!response.ok) throw new Error('Failed to fetch developers');
        const data = await response.json();
        setDevelopers(data.results);
        setFilteredDevelopers(data.results); // Set initial filtered developers to all
      } catch (error) {
        setError(error.message);
        console.error('Error fetching developers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevelopers();
  }, []);

  // Filter developers by search term
  useEffect(() => {
    const filtered = developers.filter(developer =>
      developer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDevelopers(filtered);
  }, [searchTerm, developers]);

  const handleGenreSelect = (genre) => {
    router.push(`/?genre=${genre}`);
  };

  const handleTopGameSelect = (type) => {
    router.push(`/?topGameType=${type}`);
  };

  const handleAllGamesClick = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.genreListContainer}>
          <GenreList 
            onGenreSelect={handleGenreSelect}
            onTopGameSelect={handleTopGameSelect}
            onAllGamesClick={handleAllGamesClick}
          />
        </div>
        <div>
          <div className={styles.navbar}>
            <Navbar setSearchTerm={setSearchTerm} /> {/* Pass setSearchTerm to Navbar */}
          </div>
          <div className={styles.gameList}>
            {loading && <div>Loading developers...</div>}
            {error && <div>Error: {error}</div>}
            {filteredDevelopers.map((developer) => (
              <InfoCard
                key={developer.id}
                name={developer.name}
                image={developer.image_background || '/default-image.jpg'}
                developerId={developer.id}
                gamesCount={developer.games_count || 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPage;
