import {Date, Document, Types} from 'mongoose';
import {UserForReview} from './User';

interface Review extends Document {
  text: string;
  ownerId: string | Types.ObjectId;
  owner: UserForReview;
  score: number;
  createdAt: Date;
  gameId: number;
}

export {Review};
