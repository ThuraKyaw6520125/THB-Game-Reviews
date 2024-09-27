import { useRouter } from 'next/router';
import styles from '../styles/GenreList.module.css';
import { FaGamepad, FaPuzzlePiece, FaFistRaised, FaBasketballBall, FaBullseye, FaGlobe, FaStar, FaStarHalfAlt, FaUsers, FaBuilding } from 'react-icons/fa';

const GenreList = ({ onGenreSelect, onTopGameSelect }) => {
  const router = useRouter();

  const handleGenreClick = (genre) => {
    onGenreSelect(genre);
    router.push(`/?genre=${genre}`);
  };

  const handleTopGameClick = (type) => {
    onTopGameSelect(type);
    router.push(`/?topGameType=${type}`);
  };

  const handleAllGamesClick = () => {
    onGenreSelect('');
    onTopGameSelect('');
    router.push('/');
  };

  const navigateToPage = (page) => {
    router.push(`/${page}`);
  };

  return (
    <div className={styles.genreList}>
      <button
        className={styles.allGamesButton}
        onClick={handleAllGamesClick}
      >
        <FaGlobe className={styles.iconButton} /> ALL Games
      </button>
      <div className={styles.navigationButtons}>
        <button
          className={styles.navButton}
          onClick={() => navigateToPage('developer')}
        >
          <FaUsers className={styles.iconButton} /> Developers
        </button>
        <button
          className={styles.navButton}
          onClick={() => navigateToPage('publisher')}
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
        <li onClick={() => handleGenreClick('Shooter')}>
          <FaBullseye className={styles.iconButton} /> Shooter
        </li>
        <li onClick={() => handleGenreClick('RPG')}>
          <FaGamepad className={styles.iconButton} /> RPG
        </li>
      </ul>
    </div>
  );
};

export default GenreList;
