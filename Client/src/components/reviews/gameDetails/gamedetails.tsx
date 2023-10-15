/**
 * @file This file defines the GameDetails component.
 */
import styles from '@/styles/review.module.css';
type GameDetailsProps = {
    title: string;
    description: string;
    coverImage: string;
};

/**
 * A component that displays details about a game.
 * 
 * This component provides a visualization for the title, description, and cover image of a game.
 * The description text will have a specific style if its length is greater than 700 characters.
 * 
 * @param title - The title of the game.
 * @param description - A description of the game.
 * @param coverImage - The URL to the cover image of the game.
 * 
 * @example
 * // Usage:
 * <GameDetails title="Game Title" description="This is a game description." coverImage="/path/to/cover.jpg" />
 */
const GameDetails = ({ title, description, coverImage }: GameDetailsProps) => (
  <div className={styles.container}>
    <div className={styles.detailDiv}>
      <h1>{title}</h1>
      <p className={description.length > 700 ? styles.description : ''}>
        {description}
      </p>
    </div>
    <img src={coverImage} alt={`Cover for ${title}`} className={styles.coverImage} />
  </div>
);

export default GameDetails;