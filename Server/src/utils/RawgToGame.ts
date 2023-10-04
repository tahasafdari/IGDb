import {Game} from '../interfaces/Game';
import {GameFromRawg} from '../interfaces/GameFromRawg';

export default {
  format: (rawgGame: GameFromRawg) => {
    const game = {
      title: rawgGame.name,
      apiId: rawgGame.id,
    };
    // console.log(`Game in converter: ${game.title} - ${game.apiId}`);

    return game as unknown as Game;
  },
};
