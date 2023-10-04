import fetchData from '../../functions/fetchData';
import {Game} from '../../interfaces/Game';
import {fetchByName} from '../../utils/api-fetcher';
import gameModel from '../models/gameModel';
import {GraphQLError} from 'graphql';

export default {
  Query: {
    games: async () => {
      const games = gameModel.find();
      return games;
    },
    externalGamesByName: async (_: undefined, args: {name: string}) => {
      try {
        const games: Game[] = await fetchByName(args.name);
        return games;
      } catch (error) {
        console.log(error);
      }
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
