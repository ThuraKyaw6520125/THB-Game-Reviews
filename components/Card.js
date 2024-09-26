import styles from '../styles/Card.module.css';

const Card = ({ title, image, genre, releaseDate, rating, playCount }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <img src={image} alt={title} className={styles.cardImage} />
        <div className={styles.cardContent}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.overlay}>
          <div className={styles.additionalInfo}>
            <p><strong>Genre:</strong> {genre}</p>
            <p><strong>Release Date:</strong> {releaseDate}</p>
            <p><strong>Rating:</strong> {rating}/10</p>
            <p><strong>Play Count:</strong> {playCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;