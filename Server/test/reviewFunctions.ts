/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import expect from 'expect';
import {ReviewTest} from '../src/interfaces/Review';
import ErrorResponse from '../src/interfaces/ErrorResponse';

/**
 * Retrieves an array of reviews from the specified URL using the provided token.
 * @param url - The URL to retrieve the reviews from.
 * @param token - The token to use for authorization.
 * @returns A promise that resolves to an array of ReviewTest objects.
 */
const getReviews = (
  url: string | Function,
  token: string
): Promise<ReviewTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query:
          '{ reviews { id text owner {user_name} score createdAt game { gameApiId title } } }',
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const reviews = response.body.data.reviews;
          expect(reviews).toBeInstanceOf(Array);
          expect(reviews[0]).toHaveProperty('id');
          expect(reviews[0]).toHaveProperty('text');
          expect(reviews[0]).toHaveProperty('owner');
          expect(reviews[0].owner).toHaveProperty('user_name');
          expect(reviews[0]).toHaveProperty('score');
          expect(reviews[0]).toHaveProperty('createdAt');
          expect(reviews[0]).toHaveProperty('game');
          expect(reviews[0].game).toHaveProperty('gameApiId');
          expect(reviews[0].game).toHaveProperty('title');
          resolve(response.body.data.reviews);
        }
      });
  });
};

/**
 * Retrieves reviews by owner ID from the specified URL using the provided token.
 * @param url - The URL to send the request to.
 * @param idOFOwner - The ID of the owner to retrieve reviews for.
 * @param token - The token to use for authorization.
 * @returns A Promise that resolves to an array of ReviewTest objects.
 */
const getReviewsByOwnerId = (
  url: string | Function,
  idOFOwner: string,
  token: string
): Promise<ReviewTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `query ReviewsByOwnerId($ownerId: ID!) {
            reviewsByOwnerId(ownerId: $ownerId) {
              id
              text
              owner {
                id
                user_name
              }
              score
              createdAt
              game {
                id
                title
                gameApiId
              }
            }
          }`,
        variables: {
          ownerId: idOFOwner,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const reviews = response.body.data.reviewsByOwnerId;
          expect(reviews).toBeInstanceOf(Array);
          expect(reviews[0]).toHaveProperty('text');
          expect(reviews[0]).toHaveProperty('owner');
          expect(reviews[0].owner).toHaveProperty('id');
          expect(reviews[0].owner).toHaveProperty('user_name');
          expect(reviews[0]).toHaveProperty('score');
          expect(reviews[0]).toHaveProperty('createdAt');
          expect(reviews[0]).toHaveProperty('game');
          expect(reviews[0].game).toHaveProperty('id');
          expect(reviews[0].game).toHaveProperty('gameApiId');
          expect(reviews[0].game).toHaveProperty('title');
          resolve(response.body.data.reviews);
        }
      });
  });
};

/**
 * Retrieves reviews for a game with the given ID.
 * @param url - The URL of the server.
 * @param idOFGame - The ID of the game to retrieve reviews for.
 * @param token - The authorization token for the request.
 * @returns A promise that resolves to an array of reviews for the game.
 */
const getReviewsByGameId = (
  url: string | Function,
  idOFGame: string,
  token: string
): Promise<ReviewTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `query ReviewsByGameId($gameId: ID!) {
                        reviewsByGameId(gameId: $gameId) {
                          text
                          owner {
                            user_name
                          }
                          score
                          createdAt
                          game {
                            id
                            title
                           
                          }
                        }
                      }`,
        variables: {
          gameId: idOFGame,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const reviews = response.body.data.reviewsByGameId;
          expect(reviews).toBeInstanceOf(Array);
          expect(reviews[0]).toHaveProperty('text');
          expect(reviews[0]).toHaveProperty('owner');
          expect(reviews[0].owner).toHaveProperty('user_name');
          expect(reviews[0]).toHaveProperty('score');
          expect(reviews[0]).toHaveProperty('createdAt');
          expect(reviews[0]).toHaveProperty('game');
          expect(reviews[0].game).toHaveProperty('id');
          expect(reviews[0].game).toHaveProperty('title');
          resolve(response.body.data.reviews);
        }
      });
  });
};

/**
 * Sends a POST request to create a new review using the provided review data and authorization token.
 * @param url - The URL or function to send the request to.
 * @param review - The review data to create the new review.
 * @param token - The authorization token to include in the request header.
 * @returns A Promise that resolves with the created review data.
 */
const postReview = (
  url: string | Function,
  review: ReviewTest,
  token: string
): Promise<ReviewTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation CreateReview($review: InputReview!) {
            createReview(review: $review) {
              id
              text
              owner {user_name}
              score
              createdAt
              game { id title gameApiId }
            }
          }`,
        variables: {
          review: {
            text: review.text,
            score: review.score,
            game: review.game,
          },
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const createdReview = response.body.data.createReview;
          expect(createdReview).toHaveProperty('id');
          expect(createdReview).toHaveProperty('text');
          expect(createdReview).toHaveProperty('owner');
          expect(createdReview.owner).toHaveProperty('user_name');
          expect(createdReview).toHaveProperty('score');
          expect(createdReview).toHaveProperty('createdAt');
          expect(createdReview).toHaveProperty('game');
          expect(createdReview.game).toHaveProperty('gameApiId');
          expect(createdReview.game).toHaveProperty('title');
          resolve(response.body.data.createReview);
        }
      });
  });
};

/**
 * Updates a review with the given ID, text and score.
 * @param url - The URL of the server.
 * @param id - The ID of the review to update.
 * @param text - The new text of the review.
 * @param score - The new score of the review.
 * @param token - The authentication token.
 * @returns A Promise that resolves to the updated review.
 */
const updateReview = (
  url: string | Function,
  id: string,
  text: string,
  score: number,
  token: string
): Promise<ReviewTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation UpdateReview($updateReviewId: ID!, $text: String, $score: Float) {
            updateReview(id: $updateReviewId, text: $text, score: $score) {
              id
              text
              owner {user_name}
              score
              createdAt
              game { gameApiId title }
            }
          }`,
        variables: {
          updateReviewId: id,
          text: text,
          score: score,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const updatedReview = response.body.data.updateReview;
          expect(updatedReview).toHaveProperty('id');
          expect(updatedReview).toHaveProperty('text');
          expect(updatedReview).toHaveProperty('owner');
          expect(updatedReview.owner).toHaveProperty('user_name');
          expect(updatedReview).toHaveProperty('score');
          expect(updatedReview).toHaveProperty('createdAt');
          expect(updatedReview).toHaveProperty('game');
          expect(updatedReview.game).toHaveProperty('gameApiId');
          expect(updatedReview.game).toHaveProperty('title');
          resolve(response.body.data.updateReview);
        }
      });
  });
};

/**
 * Deletes a review with the given ID from the server.
 * @param url - The URL of the server or a function that returns the URL.
 * @param id - The ID of the review to delete.
 * @param token - The authorization token to use for the request.
 * @returns A Promise that resolves with the deleted review data or rejects with an error response.
 */
const deleteReview = (
  url: string | Function,
  id: string,
  token: string
): Promise<ErrorResponse> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `mutation DeleteReview($deleteReviewId: ID!) {
            deleteReview(id: $deleteReviewId) {
              id
              text
              owner {user_name}
              score
              createdAt
              game { gameApiId title }
            }
          }`,
        variables: {
          deleteReviewId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedReview = response.body.data.deleteReview;
          expect(deletedReview).toHaveProperty('id');
          expect(deletedReview).toHaveProperty('text');
          expect(deletedReview).toHaveProperty('owner');
          expect(deletedReview.owner).toHaveProperty('user_name');
          expect(deletedReview).toHaveProperty('score');
          expect(deletedReview).toHaveProperty('createdAt');
          expect(deletedReview).toHaveProperty('game');
          expect(deletedReview.game).toHaveProperty('gameApiId');
          expect(deletedReview.game).toHaveProperty('title');
          resolve(response.body.data.deleteReview);
        }
      });
  });
};

export {
  getReviews,
  getReviewsByOwnerId,
  postReview,
  updateReview,
  deleteReview,
  getReviewsByGameId,
};
