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
`;

export default USER_BY_ID;


