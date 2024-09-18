import { useRouter } from 'next/router'; // Import useRouter from next/router for navigation
import styles from '../styles/GenreList.module.css';
import { FaGamepad, FaPuzzlePiece, FaFistRaised, FaBasketballBall, FaBullseye, FaGlobe, FaStar, FaStarHalfAlt, FaUsers, FaBuilding } from 'react-icons/fa'; // Import new icons

const GenreList = ({ onGenreSelect }) => {
  const router = useRouter(); // Initialize useRouter

  const handleGenreClick = (genre) => {
    onGenreSelect(genre); // Pass the selected genre to the parent component to filter games
  };

  const handleTopGameClick = (type) => {
    onGenreSelect(type); // Pass the type of top game ('top-rated' or 'most-popular')
  };

  const navigateToPage = (page) => {
    router.push(`/${page}`); // Navigate to the specified page
  };

  return (
    <div className={styles.genreList}>
      <button
        className={styles.allGamesButton}
        onClick={() => handleGenreClick('')} // Pass an empty string to show all games
      >
        <FaGlobe className={styles.iconButton} /> ALL Games
      </button>

      <div className={styles.navigationButtons}>
        <button
          className={styles.navButton}
          onClick={() => navigateToPage('developer')} // Navigate to Developer page
        >
          <FaUsers className={styles.iconButton} /> Developers
        </button>
        <button
          className={styles.navButton}
          onClick={() => navigateToPage('publisher')} // Navigate to Publisher page
        >
          <FaBuilding className={styles.iconButton} /> Publishers
        </button>
      </div>

      <h2>Top Games</h2>
      <ul>
        <li onClick={() => handleTopGameClick('top-rated')}>
          <FaStar className={styles.iconButton} /> Best Rated
        </li>
        <li onClick={() => handleTopGameClick('most-popular')}>
          <FaStarHalfAlt className={styles.iconButton} /> Most Popular
        </li>
      </ul>

      <h2>Genres</h2>
      <ul>
        <li onClick={() => handleGenreClick('Action')}>
          <FaFistRaised className={styles.iconButton} /> Action
        </li>
        <li onClick={() => handleGenreClick('Adventure')}>
          <FaGamepad className={styles.iconButton} /> Adventure
        </li>
        <li onClick={() => handleGenreClick('Puzzle')}>
          <FaPuzzlePiece className={styles.iconButton} /> Puzzle
        </li>
        <li onClick={() => handleGenreClick('Sport')}>
          <FaBasketballBall className={styles.iconButton} /> Sport
        </li>
        <li onClick={() => handleGenreClick('Shooter')}>
          <FaBullseye className={styles.iconButton} /> Shooter
        </li>
        <li onClick={() => handleGenreClick('Free Online Game')}>
          <FaGlobe className={styles.iconButton} /> Free Online Game
        </li>
        <li onClick={() => handleGenreClick('RPG')}>
          <FaGamepad className={styles.iconButton} /> RPG
        </li>
      </ul>
    </div>
  );
};

export default GenreList;
