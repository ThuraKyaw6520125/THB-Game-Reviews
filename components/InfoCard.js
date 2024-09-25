import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa'; // Import person icon
import { useRouter } from 'next/router';
import styles from '../styles/Card.module.css';

const InfoCard = ({ name, image, developerId, gamesCount }) => {
  const [topGames, setTopGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTopGames = async () => {
      try {
        const URL = `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&developers=${developerId}&ordering=-rating&page_size=3`;
        const response = await fetch(URL);
        if (!response.ok) throw new Error('Failed to fetch top games');
        const data = await response.json();
        setTopGames(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchPopularGames = async () => {
      try {
        const URL = `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&developers=${developerId}&ordering=-added&page_size=3`;
        const response = await fetch(URL);
        if (!response.ok) throw new Error('Failed to fetch popular games');
        const data = await response.json();
        setPopularGames(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTopGames();
    fetchPopularGames();
  }, [developerId]);

  const handleNavigate = (path) => {
    router.push(path);
  };

  // Display the count of popular games or "N/A"
  const popularItemsCount = gamesCount > 0 ? `${gamesCount} games` : 'N/A';

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <img src={image} alt={name} className={styles.cardImage} />
        <div className={styles.cardContent}>
          <h3 className={styles.title}>{name}</h3>
          {/* Display popular items count */}
          <p className={styles.popularItem}>
            Popular Items: {popularItemsCount}
          </p>
        </div>
        <div className={styles.overlay}>
          <h4 className={styles.leaderTitle}>
            Top Rated Games
          </h4>
          {error ? (
            <p>Error fetching games</p>
          ) : (
            topGames.length > 0 ? (
              topGames.map((game) => (
                <p key={game.id} className={styles.gameInfo}>
                  {game.name} - {game.rating}/10
                </p>
              ))
            ) : (
              <p>No top rated games available</p>
            )
          )}
          <h4 className={styles.leaderTitle}>
            Popular Games
          </h4>
          {error ? (
            <p>Error fetching popular games</p>
          ) : (
            popularGames.length > 0 ? (
              popularGames.map((game) => (
                <p key={game.id} className={styles.gameInfo}>
                  {game.name} <FaUser className={styles.personIcon} /> {game.added} players
                </p>
              ))
            ) : (
              <p>No popular games available</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
