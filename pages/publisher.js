import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/NavBar';
import GenreList from '../components/GenreList';
import PublisherCard from '../components/PublisherCard';
import styles from '../styles/Home.module.css';

const PublisherPage = () => {
  const [publishers, setPublishers] = useState([]);
  const [filteredPublishers, setFilteredPublishers] = useState([]); // New state for filtered publishers
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const URL = `https://api.rawg.io/api/publishers?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page_size=20`;
        const response = await fetch(URL);
        if (!response.ok) throw new Error('Failed to fetch publishers');
        const data = await response.json();
        setPublishers(data.results);
        setFilteredPublishers(data.results); // Set initial filtered publishers to all
      } catch (error) {
        setError(error.message);
        console.error('Error fetching publishers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublishers();
  }, []);

  // Filter publishers by search term
  useEffect(() => {
    const filtered = publishers.filter(publisher =>
      publisher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPublishers(filtered);
  }, [searchTerm, publishers]);

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
            {loading && <div>Loading publishers...</div>}
            {error && <div>Error: {error}</div>}
            {filteredPublishers.map((publisher) => (
              <PublisherCard
                key={publisher.id}
                name={publisher.name}
                image={publisher.image_background || '/default-image.jpg'}
                popularGames={publisher.games}
                gamesCount={publisher.games_count}
              />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default PublisherPage;
