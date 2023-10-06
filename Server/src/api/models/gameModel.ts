import {Game} from '../../interfaces/Game';
import mongoose, {Document, Schema, Model} from 'mongoose';

/**
 * Mongoose schema definition for the Game model.
 */
const gameSchema: Schema<Game & Document> = new mongoose.Schema<Game>({
  title: {
    type: String,
    required: true, // The title is required for a game.
    unique: true, // Ensure that titles are unique.
  },
  gameApiId: {
    type: Number,
    required: true, // The gameApiId is required for a game.
    unique: true, // Ensure that gameApiIds are unique.
  },
  description: {
    type: String, // Description is an optional field.
  },
  image: {
    type: String, // Image is an optional field.
  },
});

/**
 * Mongoose model for the Game collection.
 */
const GameModel: Model<Game & Document> = mongoose.model<Game>(
  'Game',
  gameSchema
);

export default GameModel;
