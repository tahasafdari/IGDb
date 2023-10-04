import {Date, Document, Types} from 'mongoose';
import {UserOfReview} from './User';
import {Game} from './Game';

interface Review extends Document {
  _id: Types.ObjectId;
  text: string;
  owner: UserOfReview;
  score: number;
  createdAt: Date;
  game: Game;
}

export {Review};
