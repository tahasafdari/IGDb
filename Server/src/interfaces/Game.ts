import {Document} from 'mongoose';

interface Game extends Document {
  title: string;
  gameApiId: number;
  description: string;
  image: string;
}

export {Game};
