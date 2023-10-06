import {Game} from '../../interfaces/Game';
import mongoose from 'mongoose';

const gameModel = new mongoose.Schema<Game>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  gameApiId: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

export default mongoose.model<Game>('Game', gameModel);
