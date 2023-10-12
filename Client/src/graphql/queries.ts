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

export { USER_BY_ID, EXTERNAL_GAMES_BY_NAME }
