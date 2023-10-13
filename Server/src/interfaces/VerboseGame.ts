/**
 * VerboseGame Interface
 * this is a more detailed version of the Game interface used to display more information about a game on a tilecard and game page.
 */
interface VerboseGame {
  // the title of the game.
  title: string;
  // the url to the image of the game.
  image: string;
  // the RAWG API id of the game.
  externalId: number;
  // the rating of the game.
  rating: number;
  // the description of the game.
  description: string;
}

export {VerboseGame};
