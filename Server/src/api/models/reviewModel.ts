import mongoose, {Document, Schema, Model, Types} from 'mongoose';
import {Review} from '../../interfaces/Review';

/**
 * Define the review model schema using mongoose.Schema.
 */
const reviewSchema: Schema<Review & Document> = new mongoose.Schema<Review>({
  /**
   * The text of the review.
   */
  text: {
    type: String,
    required: true, // The 'text' field is required for a review.
  },

  /**
   * The owner of the review, referenced by their user ID.
   */
  owner: {
    type: Types.ObjectId,
    ref: 'User', // Reference to the 'User' model.
    required: true, // The 'owner' field is required for a review.
  },

  /**
   * The score given in the review, ranging from 1 to 5.
   */
  score: {
    type: Number,
    required: true, // The 'score' field is required for a review.
    min: 1, // Minimum allowed score.
    max: 5, // Maximum allowed score.
  },

  /**
   * The date and time when the review was created.
   */
  createdAt: {
    type: Date,
    required: true, // The 'createdAt' field is required for a review.
    default: Date.now(), // Default value is the current date and time.
  },

  /**
   * The game associated with the review, referenced by its game ID.
   */
  game: {
    type: Types.ObjectId,
    ref: 'Game', // Reference to the 'Game' model.
    required: true, // The 'game' field is required for a review.
  },
});

/**
 * Create and export the mongoose model for the Review collection.
 */
const ReviewModel: Model<Review & Document> = mongoose.model<Review>(
  'Review',
  reviewSchema
);
export default ReviewModel;
