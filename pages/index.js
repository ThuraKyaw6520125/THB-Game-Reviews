import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import GenreList from '../components/GenreList';
import Card from '../components/Card';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [topGameType, setTopGameType] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let url = `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`;

        if (topGameType === 'top-rated') {
          url += '&ordering=-rating'; // Fetch games ordered by rating (highest first)
        } else if (topGameType === 'most-popular') {
          url += '&ordering=-reviews_count'; // Fetch games ordered by review count (highest first)
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const gameList = await response.json();
        setGames(gameList.results); // Ensure 'results' is the correct property
      } catch (error) {
        setError(error.message);
        console.error('Fetch error:', error);
      }
    };

    fetchGames();
  }, [topGameType]); // Refetch when topGameType changes

  useEffect(() => {
    if (selectedGenre) {
      setFilteredGames(games.filter(game =>
        game.genres && game.genres.some(g => g.name.toLowerCase() === selectedGenre.toLowerCase())
      ));
    } else {
      setFilteredGames(games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    }
  }, [games, selectedGenre, searchTerm]); // Update filtered games when games, selectedGenre, or searchTerm changes

  const handleGenreSelect = (genre) => {
    if (genre === '') {
      setSelectedGenre(''); // Clear genre filter to show all games
      setTopGameType(''); // Clear top game type filter
    } else if (['top-rated', 'most-popular'].includes(genre)) {
      setTopGameType(genre); // Update top game type
      setSelectedGenre(''); // Clear genre filter
    } else {
      setSelectedGenre(genre); // Update genre filter
      setTopGameType(''); // Clear top game type filter
    }
  };

  return (
    <div className={styles.container}>
      <Navbar setSearchTerm={setSearchTerm} />
      <div className={styles.mainContent}>
        <GenreList onGenreSelect={handleGenreSelect} />
        <div className={styles.gameList}>
          {error && <div>Error: {error}</div>}
          {filteredGames.map((game) => (
            <Card
              key={game.id}
              title={game.name}
              platformIcons={game.platforms ? game.platforms.map(p => p.platform.logo_background) : []}
              playerCount={game.playtime || 0}
              image={game.background_image}
              genre={game.genres ? game.genres.map(g => g.name).join(', ') : 'N/A'}
              releaseDate={game.released || 'N/A'}
              rating={game.rating || 'N/A'}
              trailerUrl={game.website || '#'} // Provide a valid trailer URL or placeholder
            />
          ))}
        </div>
      </div>
    </div>
  );
}
