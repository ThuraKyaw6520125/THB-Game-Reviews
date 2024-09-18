// components/InfoCard.js

import styles from '../styles/Card.module.css'; // Assuming similar styles

const InfoCard = ({ name, image, description, popularGame }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <img src={image} alt={name} className={styles.cardImage} />
        <div className={styles.cardContent}>
          <h3 className={styles.title}>{name}</h3>
        </div>
        <div className={styles.overlay}>
          <div className={styles.additionalInfo}>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Popular Game:</strong> {popularGame}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
