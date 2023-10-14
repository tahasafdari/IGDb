// components/GameDetails.tsx
import styles from '@/styles/review.module.css'

type GameDetailsProps = {
    title: string;
    description: string;
    coverImage: string;
  };
  const GameDetails = ({ title, description, coverImage }: GameDetailsProps) => (
    <div className={styles.container}>
      <div className={styles.detailDiv}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <img src={coverImage} alt={`Cover for ${title}`} className={styles.coverImage} />
    </div>
  );
  export default GameDetails;
  