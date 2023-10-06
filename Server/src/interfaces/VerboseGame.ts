interface VerboseGame {
  /**
   * VerboseGame Interface
   * this is a more detailed version of the Game interface used to display more information about a game on a tilecard and game page.
   */
  title: string;
  // the title of the game.
  image: string;
  // the url to the image of the game.
  externalId: number;
  // the RAWG API id of the game.
  rating: number;
  // the rating of the game.
}

export {VerboseGame};
