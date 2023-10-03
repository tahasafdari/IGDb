import {Game} from '../../interfaces/Game';
import mongoose from 'mongoose';

const gameModel = new mongoose.Schema<Game>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  apiId: {
    type: Number,
    required: true,
    unique: true,
  },
});

export default mongoose.model<Game>('Game', gameModel);
