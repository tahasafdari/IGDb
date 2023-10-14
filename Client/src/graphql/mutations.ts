import { gql } from '@apollo/client';

const UPDATE_USER = gql`
    mutation UpdateUser($user: UserModify!) {
        updateUser(user: $user) {
            token
            message
            user {
                id
                user_name
                email
                profile_image
                favourite_games
            }
        }
    }
`;

const CREATE_REVIEW = gql`
  mutation CreateReview($review: InputReview!) {
    createReview(review: $review) {
      id
      text
      score
      game {
        id
        title
      }
      owner {
        user_name
      }
    }
  }
`;

export { UPDATE_USER, CREATE_REVIEW};
