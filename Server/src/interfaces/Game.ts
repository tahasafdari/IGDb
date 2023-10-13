import {Document} from 'mongoose';
/**
 * Game Interface
 *
 * Represents a game document in the MongoDB database.
 */
interface Game extends Document {
  /** The title of the game. */
  title: string;
  /** The unique identifier for the game from the game API. */
  gameApiId: number;
  /** A description of the game. */
  description: string;
  /** The URL or path to an image associated with the game. */
  image: string;
}

/**
 * Represents a game object with optional properties.
 */
interface GameTest {
  /**
   * The title of the game.
   */
  title?: string;
  /**
   * The unique ID of the game in the game API.
   */
  gameApiId?: number;
  /**
   * The description of the game.
   */
  description?: string;
  /**
   * The URL of the image associated with the game.
   */
  image?: string;
}

export {Game, GameTest};
