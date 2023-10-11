// components/GameDetails.tsx
import styles from '@/styles/review.module.css'

type GameDetailsProps = {
    title: string;
    releaseDate: string;
    genre: string;
    coverImage: string;
  };
  const GameDetails = ({ title, releaseDate, genre, coverImage }: GameDetailsProps) => (
    <div className={styles.container}>
      <div className={styles.detailDiv}>
        <h1>{title}</h1>
        <p>Release Date: {releaseDate}</p>
        <p>Genre: {genre}</p>
      </div>
      <img src={coverImage} alt={`Cover for ${title}`} className={styles.coverImage} />
    </div>
  );
  export default GameDetails;
  