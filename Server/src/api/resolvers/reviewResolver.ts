import {GraphQLError} from 'graphql';
import reviewModel from '../models/reviewModel';
import userModel from '../models/userModel';
import {Review} from '../../interfaces/Review';
import {User} from '../../interfaces/User';

export default {
  Query: {
    reviews: async () => {
      const reviews = reviewModel.find() as unknown as Review[];
      return reviews;
    },
    reviewsByOwnerId: async (_: undefined, args: {ownerId: string}) => {
      const owner = await userModel.findById(args.ownerId);
      if (!owner) {
        throw new GraphQLError('User not found', {
          extensions: {code: 'NOT_FOUND'},
        });
      }

      const reviews = reviewModel.find({owner: owner}) as unknown as Review[];
      return reviews;
    },

    reviewsByGameId: async (_: undefined, args: {gameId: string}) => {
      console.log(args);
      const reviews = reviewModel
        .find({
          gameId: args.gameId,
        })
        .populate('owner') as unknown as Review[];
      return reviews;
    },
  },

  Mutation: {
    createReview: async (_: undefined, args: {review: Review}) => {
      if (!args.review.text || !args.review.score || !args.review.gameId) {
        throw new GraphQLError('all the fields required', {
          extensions: {code: 'NOT_FOUND'},
        });
      }
      const owner = (await userModel
        .findById(args.review.ownerId)
        .select('-__v -password -email -role')) as unknown as User;

      if (!owner) {
        throw new GraphQLError('User not found', {
          extensions: {code: 'NOT_FOUND'},
        });
      }
      const review = new reviewModel(args.review);
      review.owner = owner;
      await review.save();
      console.log(review);
      return review;
    },
  },
};
