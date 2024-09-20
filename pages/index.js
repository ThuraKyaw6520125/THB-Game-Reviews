// pages/index.js
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

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let url = `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`;
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

  useEffect(() => {
    if (router.query.genre) {
      setSelectedGenre(router.query.genre);
      setTopGameType('');
    } else if (router.query.topGameType) {
      setTopGameType(router.query.topGameType);
      setSelectedGenre('');
    } else {
      setSelectedGenre('');
      setTopGameType('');
    }
  }, [router.query]);

  useEffect(() => {
    let updatedGames = [...games];
    
    if (topGameType === 'top-rated') {
      updatedGames = updatedGames.sort((a, b) => b.rating - a.rating);
    } else if (topGameType === 'most-popular') {
      updatedGames = updatedGames.sort((a, b) => b.reviews_count - a.reviews_count);
    }

    if (selectedGenre) {
      updatedGames = updatedGames.filter(game =>
        game.genres && game.genres.some(g => g.name.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    if (searchTerm) {
      updatedGames = updatedGames.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGames(updatedGames);
  }, [games, selectedGenre, searchTerm, topGameType]);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setTopGameType('');
    router.push(genre ? `/?genre=${genre}` : '/');
  };

  const handleTopGameSelect = (type) => {
    setTopGameType(type);
    setSelectedGenre('');
    router.push(`/?topGameType=${type}`);
  };

  return (
    <div className={styles.container}>
      <Navbar setSearchTerm={setSearchTerm} />
      <div className={styles.mainContent}>
        <GenreList onGenreSelect={handleGenreSelect} onTopGameSelect={handleTopGameSelect} />
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
              playCount={game.playtime || 'N/A'}
              trailerUrl={game.website || '#'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
