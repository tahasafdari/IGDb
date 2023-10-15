import { gql } from '@apollo/client'
/**
 * GraphQL query to fetch a user's information by their unique ID.
 * 
 * This query takes a user's ID as an argument and retrieves the user's 
 * details such as id, username, email, profile image, and favourite games.
 * 
 * @param $id - The unique ID of the user.
 * 
 * @returns {Object} The user's details.
 */
const USER_BY_ID = gql`
  query UserById($id: ID!) {
    userById(id: $id) {
      id
      user_name
      email
      profile_image
      favourite_games
    }
  }
`
/**
 * GraphQL query to fetch external games based on a given name.
 * 
 * This query takes a game's name as an argument and retrieves a list of
 * external games that match the given name. Each game has details like title,
 * image, and gameApiId.
 * 
 * @param $name - The name of the game.
 * 
 * @returns {Object[]} An array of games that match the given name.
 */
const EXTERNAL_GAMES_BY_NAME = gql`
  query ExternalGamesByName($name: String!) {
    externalGamesByName(name: $name) {
      title
      image
      gameApiId
    }
  }
`
/**
 * GraphQL query to fetch details of an external game by its API ID.
 * 
 * This query takes a game's API ID as an argument and retrieves the 
 * game's details like title, description, and image.
 * 
 * @param $gameApiId - The API ID of the game.
 * 
 * @returns {Object} The game's details.
 */
const EXTERNAL_GAME_BY_ID = gql`
  query ExternalGameByApiId($gameApiId: Int!) {
    externalGameByApiId(gameApiId: $gameApiId) {
      title
      description
      image
    }
  }
`;
/**
 * GraphQL query to fetch reviews of a game based on its API ID.
 * 
 * This query takes a game's API ID as an argument and retrieves 
 * all reviews associated with that game. Each review includes the text, 
 * score, creation date, and the owner's details.
 * 
 * @param $gameApiId - The API ID of the game.
 * 
 * @returns {Object[]} An array of reviews associated with the game.
 */
const GET_REVIEWS_BY_GAME_ID = gql`
query ReviewsByGameId($gameApiId: Int!) {
    reviewsByGameId(gameApiId: $gameApiId) {
      text
      score
      createdAt
      owner {
        user_name
        profile_image
      }
    }
  }
`;


export { USER_BY_ID, EXTERNAL_GAMES_BY_NAME, EXTERNAL_GAME_BY_ID, GET_REVIEWS_BY_GAME_ID }
