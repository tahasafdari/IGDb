import {Date, Document, Types} from 'mongoose';
import {UserOfReview} from './User';
import {Game} from './Game';

/**
 * Review Interface
 *
 * Represents a review document in the MongoDB database.
 */
interface Review extends Document {
  /** The unique identifier of the review. */
  _id: Types.ObjectId;
  /** The text content of the review. */
  text: string;
  /** The owner of the review, represented as a UserOfReview object. */
  owner: UserOfReview;
  /** The score or rating given to the game in the review. */
  score: number;
  /** The date and time when the review was created. */
  createdAt: Date;
  /** The game associated with the review, represented as a Game object. */
  game: Game;
}

export {Review};
