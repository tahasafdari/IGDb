import { gql } from '@apollo/client';
/**
 * GraphQL mutation for updating a user's information.
 * 
 * This mutation accepts a `UserModify` object as its argument and updates the user's
 * details in the database. It returns the updated user's token, message, and details
 * such as id, username, email, profile image, and favourite games.
 * 
 * @param $user - A `UserModify` object containing the user's details to be updated.
 * 
 * @returns {Object} The updated user's details, token, and message.
 */
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
/**
 * GraphQL mutation for creating a new review.
 * 
 * This mutation accepts an `InputReview` object as its argument and adds a new review
 * to the database. It returns the created review's id, text, score, associated game, and owner details.
 * 
 * @param $review - An `InputReview` object containing the review's details.
 * 
 * @returns {Object} The created review's details, associated game, and owner's username.
 */
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