import { gql } from '@apollo/client'

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

const EXTERNAL_GAMES_BY_NAME = gql`
  query ExternalGamesByName($name: String!) {
    externalGamesByName(name: $name) {
      title
      image
      gameApiId
    }
  }
`
const EXTERNAL_GAME_BY_ID = gql`
  query ExternalGameByApiId($gameApiId: Int!) {
    externalGameByApiId(gameApiId: $gameApiId) {
      title
      description
      image
    }
  }
`;

const GET_REVIEWS_BY_GAME_ID = gql`
query ReviewsByGameId($gameId: ID!) {
    reviewsByGameId(gameId: $gameId) {
      text
      score
      createdAt
      owner {
        user_name
      }
    }
  }
`;


export { USER_BY_ID, EXTERNAL_GAMES_BY_NAME, EXTERNAL_GAME_BY_ID, GET_REVIEWS_BY_GAME_ID }
