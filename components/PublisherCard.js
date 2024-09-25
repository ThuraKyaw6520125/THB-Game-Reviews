// PublisherCard.js
import React, { useState } from 'react';
import styles from '../styles/PublisherCard.module.css';

const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const PublisherCard = ({ name, image, popularGames, gamesCount }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div
      className={`${styles.card} ${isHovered ? styles.expanded : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.details}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.popularItem}>
          Popular items: <PersonIcon /> {formatNumber(gamesCount)}
        </p>
        {isHovered && (
          <div className={styles.expandedDetails}>
            <ul>
              {popularGames.slice(0, 3).map((game, index) => (
                <li key={index}>
                  <span className={styles.gameName}>{game.name}</span>
                  <span className={styles.gameCount}>
                    <PersonIcon /> {formatNumber(game.added)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublisherCard;