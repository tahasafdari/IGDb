import {VerboseGame} from '../interfaces/VerboseGame';
import {Game} from '../interfaces/Game';
import {GameFromRawg} from '../interfaces/GameFromRawg';

export default {
  /**
   * this function formats a game object returned from the RAWG API into a Game object to be saved in our database.
   * @param rawgGame the game to be formatted
   * @returns a Game object
   */
  format: (rawgGame: GameFromRawg) => {
    const game = {
      title: rawgGame.name,
      gameApiId: rawgGame.id,
    };
    // console.log(`Game in converter: ${game.title} - ${game.apiId}`);

    return game as unknown as Game;
  },
  /**
   * this function formats a game object returned from the RAWG API into a VerboseGame object to be displayed on a tilecard or game page.
   * @param rawgGame the game to be formatted
   * @returns a VerboseGame object
   */
  formatTile: (rawgGame: GameFromRawg) => {
    const game = {
      gameApiId: rawgGame.id,
      title: rawgGame.name,
      image: rawgGame.background_image,
      externalId: rawgGame.id,
      description: rawgGame.description_raw,
    };

    return game as unknown as VerboseGame;
  },
};
