import {Document} from 'mongoose';

interface Game extends Document {
  title: string;
  apiId: number;
}

export {Game};
