import fetchData from '../../functions/fetchData';
import {Game} from '../../interfaces/Game';
import gameModel from '../models/gameModel';
import {GraphQLError} from 'graphql';

export default {
  Query: {
    games: async () => {
      const games = gameModel.find();
      return games;
    },
  },

  Mutation: {
    createGame: async (_: undefined, args: Game) => {
      if (!args.title || !args.apiId) {
        throw new GraphQLError('all the fields required', {
          extensions: {code: 'NOT_FOUND'},
        });
      }
      const game = new gameModel(args);
      await game.save();
      return game;
    },
  },
};
