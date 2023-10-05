import { CarouselleTileData } from '../interfaces/CarouselleTileData';
import {Game} from '../interfaces/Game';
import {GameFromRawg} from '../interfaces/GameFromRawg';

export default {
  format: (rawgGame: GameFromRawg) => {
    const game = {
      title: rawgGame.name,
      gameApiId: rawgGame.id,
    };
    // console.log(`Game in converter: ${game.title} - ${game.apiId}`);

    return game as unknown as Game;
  },
  formatTile: (rawgGame: GameFromRawg) => {

    console.log(rawgGame);
    
    const game = {
      gameApiId: rawgGame.id,
      title: rawgGame.name,
      image: rawgGame.background_image,
      externalId: rawgGame.id,
      description: rawgGame.description_raw,
    };

    return game as unknown as CarouselleTileData;
  },
};
