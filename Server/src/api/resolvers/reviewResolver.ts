import {GraphQLError} from 'graphql';
import reviewModel from '../models/reviewModel';
import userModel from '../models/userModel';
import {Review} from '../../interfaces/Review';
import {UserIdWithToken, UserOfReview} from '../../interfaces/User';
import gameModel from '../models/gameModel';
import checkAuth from '../../functions/checkAuth';
import {fetchById} from '../../utils/api-fetcher';
import {Game} from '../../interfaces/Game';

export default {
  Query: {
    reviews: async () => {
      const reviews = reviewModel
        .find()
        .populate('game owner') as unknown as Review[];
      return reviews;
    },
    reviewsByOwnerId: async (
      _: undefined,
      args: {ownerId: string},
      user: UserIdWithToken
    ) => {
      checkAuth(user);
      const owner = (await userModel
        .findById(args.ownerId)
        .select('-role -password -__v -email')) as unknown as UserOfReview;
      console.log(owner);
      if (!owner) {
        throw new GraphQLError('User not found', {
          extensions: {code: 'NOT_FOUND'},
        });
      }
      const reviews = reviewModel
        .find({
          owner: owner,
        })
        .populate('owner game') as unknown as Review[];
      console.log(reviews);
      return reviews;
    },

    reviewsByGameId: async (
      _: undefined,
      args: {gameId: string},
      user: UserIdWithToken
    ) => {
      checkAuth(user);
      const game = await gameModel.findById(args.gameId);
      if (!game) {
        throw new GraphQLError('Game not found', {
          extensions: {code: 'NOT_FOUND'},
        });
      }
      const reviews = reviewModel
        .find({
          game: game,
        })
        .populate('owner game') as unknown as Review[];
      return reviews;
    },
  },

  Mutation: {
    createReview: async (
      _: undefined,
      args: {review: Review},
      user: UserIdWithToken //context
    ) => {
      checkAuth(user);
      const gameApiId = args.review.game.gameApiId;
      const gameFromApi = await fetchById(gameApiId.toString());
      if (!gameFromApi) {
        throw new GraphQLError('Game not found', {
          extensions: {code: 'NOT_FOUND'},
        });
      }
      const gameInDb = await gameModel.findOne({
        gameApiId: gameApiId,
      });
      args.review.game = gameInDb as Game;
      if (!gameInDb) {
        const game = new gameModel(gameFromApi);
        await game.save();
        args.review.game = game;
      }

      if (!args.review.text || !args.review.score) {
        throw new GraphQLError('all the fields required', {
          extensions: {code: 'NOT_FOUND'},
        });
      }

      const owner = (await userModel
        .findById(user.id)
        .select('-__v -password -role -email')) as unknown as UserOfReview;
      if (!owner) {
        throw new GraphQLError('User not found', {
          extensions: {code: 'NOT_FOUND'},
        });
      }

      const review = new reviewModel(args.review);
      review.owner = owner;
      return await review.save();
    },

    updateReview: async (_: undefined, args: Review, user: UserIdWithToken) => {
      checkAuth(user);
      if (!args.id) {
        throw new GraphQLError('Review not found', {
          extensions: {code: 'NOT_FOUND'},
        });
      }
      const updatedReview = (await reviewModel
        .findByIdAndUpdate(args.id, args, {
          new: true,
        })
        .populate('owner game')) as unknown as Review;
      return updatedReview;
    },

    deleteReview: async (
      _: undefined,
      args: {id: string},
      user: UserIdWithToken
    ) => {
      checkAuth(user);
      if (!args.id) {
        throw new GraphQLError('Review not found', {
          extensions: {code: 'NOT_FOUND'},
        });
      }
      const deletedReview = (await reviewModel
        .findByIdAndDelete(args.id)
        .populate('owner game')) as unknown as Review;
      return deletedReview;
    },
  },
};
