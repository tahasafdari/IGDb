import mongoose from 'mongoose';
import {User} from '../../interfaces/User';

const userModel = new mongoose.Schema<User>({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile_image: {
    type: String,
    required: false,
    },
  favourite_games: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
    }
  ]
});

export default mongoose.model<User>('User', userModel);
