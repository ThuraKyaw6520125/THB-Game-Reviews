import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  // Fetch games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const url = `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page_size=50`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const gameList = await response.json();
        setGames(gameList.results);
      } catch (error) {
        setError(error.message);
        console.error('Fetch error:', error);
      }
    };
    fetchGames();
  }, []);

  // Filter and sort games based on genre, search term, and top game type
  useEffect(() => {
    let updatedGames = [...games];

    // Filter by selected genre
    if (selectedGenre) {
      updatedGames = updatedGames.filter((game) =>
        game.genres && game.genres.some((g) => g.name.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm) {
      updatedGames = updatedGames.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by topGameType
    if (topGameType === 'top-rated') {
      updatedGames = updatedGames.sort((a, b) => b.rating - a.rating); // Sort by highest rating
    } else if (topGameType === 'most-popular') {
      updatedGames = updatedGames.sort((a, b) => b.added - a.added); // Sort by most added/played
    }

    setFilteredGames(updatedGames);
  }, [games, selectedGenre, searchTerm, topGameType]);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchTerm(''); // Reset search term when selecting a genre
    router.push(genre ? `/?genre=${genre}` : '/', undefined, { shallow: true });
  };

  const handleTopGameSelect = (type) => {
    setTopGameType(type);
    setSelectedGenre(''); // Reset genre when selecting top game type
    setSearchTerm('');
    router.push(`/?topGameType=${type}`, undefined, { shallow: true });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedGenre(''); // Reset selected genre if a search is performed
    router.push(term ? `/?search=${term}` : '/', undefined, { shallow: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.genreListContainer}>
        <GenreList
          onGenreSelect={handleGenreSelect}
          onTopGameSelect={handleTopGameSelect}
        />
        </div>
        <div>
          <div className={styles.navbar}>
              <Navbar setSearchTerm={handleSearch} />
          </div>
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
                playCount={game.added || 'N/A'} // Play count or added count
                trailerUrl={game.website || '#'}
              />
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
