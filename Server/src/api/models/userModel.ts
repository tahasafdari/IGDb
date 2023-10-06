import mongoose, {Document, Schema, Model} from 'mongoose';
import {User} from '../../interfaces/User';

/**
 * Define the user model schema using mongoose.Schema.
 */
const userSchema: Schema<User & Document> = new mongoose.Schema<User>({
  /**
   * The user's username.
   */
  user_name: {
    type: String,
    required: true, // The 'user_name' field is required for a user.
    unique: true, // Ensure that usernames are unique.
  },

  /**
   * The user's email address.
   */
  email: {
    type: String,
    required: true, // The 'email' field is required for a user.
    unique: true, // Ensure that email addresses are unique.
  },

  /**
   * The URL of the user's profile image.
   */
  profile_image: {
    type: String,
    required: false, // The 'profile_image' field is optional.
  },

  /**
   * An array of favorite games, each referenced by its game ID.
   */
  favourite_games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game', // Reference to the 'Game' model.
    },
  ],
});

/**
 * Create and export the mongoose model for the User collection.
 */
const UserModel: Model<User & Document> = mongoose.model<User>(
  'User',
  userSchema
);
export default UserModel;
