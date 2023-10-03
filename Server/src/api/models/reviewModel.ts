import mongoose from 'mongoose';
import {Review} from '../../interfaces/Review';

const reviewModel = new mongoose.Schema<Review>({
  text: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  gameId: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<Review>('Review', reviewModel);
