import {Date, Document, Types} from 'mongoose';
import {User} from './User';

interface Review extends Document {
  text: string;
  ownerId: string | Types.ObjectId;
  owner: User;
  score: number;
  createdAt: Date;
  gameId: string | Types.ObjectId;
}

export {Review};
