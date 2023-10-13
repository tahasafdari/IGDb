/* eslint-disable node/no-unpublished-import */
import request from 'supertest';
import expect from 'expect';
import {ReviewTest} from '../src/interfaces/Review';
import ErrorResponse from '../src/interfaces/ErrorResponse';

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
