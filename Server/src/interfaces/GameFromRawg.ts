interface GameFromRawg {
  /**
   * GameFromRawg Interface
   * this interface represents an object returned from the RAWG API.
   * the interface is used to convert the object into a Game object. to be saved in our database.
   */
  id: number;
  // The id received from the RAWG API.
  name: string;
  // the name of the game.
  released: string;
  // the release date of the game.
  background_image: string;
  // the url to the image of the game.
  rating: number;
  // the rating of the game.
  metacritic: number;
  // the metacritic score of the game.
  description_raw: string;
  // a text description of the game.
}

export {GameFromRawg};
