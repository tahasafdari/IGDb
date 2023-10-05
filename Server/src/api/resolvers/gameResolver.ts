import checkAuth from '../../functions/checkAuth';
import {Game} from '../../interfaces/Game';
import {Review} from '../../interfaces/Review';
import {UserIdWithToken} from '../../interfaces/User';
import {fetchById, fetchByName} from '../../utils/api-fetcher';
import gameModel from '../models/gameModel';
import {GraphQLError} from 'graphql';

export default {
  // //Should return all the reviews of the game
  // Review: {
  //   game: async (parent: Review) => {
  //     console.log('This me !!!!: ', parent);
  //     return await gameModel.findById(parent.game);
  //   },
  // },

  Query: {
    games: async (_: undefined, __: undefined, user: UserIdWithToken) => {
      checkAuth(user);
      const games = gameModel.find() as unknown as Game[];
      return games;
    },

    gameById: async (
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
      return game;
    },

    gameByTitle: async (
      _: undefined,
      args: {title: string},
      user: UserIdWithToken
    ) => {
      checkAuth(user);
      const game = (await gameModel.findOne({
        title: args.title,
      })) as unknown as Game;
      if (!game) {
        throw new GraphQLError('Game not found', {
          extensions: {code: 'NOT_FOUND'},
        });
      }
      return game;
    },

    gameByApiId: async (
      _: undefined,
      args: {gameApiId: number},
      user: UserIdWithToken
    ) => {
      checkAuth(user);
      const game = (await gameModel.findOne({
        gameApiId: args.gameApiId,
      })) as unknown as Game;
      if (!game) {
        throw new GraphQLError('Game not found', {
          extensions: {code: 'NOT_FOUND'},
        });
      }
      return game;
    },
    externalGamesByName: async (
      _: undefined,
      args: {name: string},
      user: UserIdWithToken
    ) => {
      checkAuth(user);
      try {
        const games: Game[] = await fetchByName(args.name);
        return games;
      } catch (error) {
        console.log(error);
      }
    },
    externalGameByApiId: async (
      _: undefined,
      args: {gameApiId: number; mode: number},
      user: UserIdWithToken
    ) => {
      checkAuth(user);
      try {
        const game = await fetchById(args.gameApiId.toString(), args.mode);
        return game;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    createGame: async (_: undefined, args: Game, user: UserIdWithToken) => {
      checkAuth(user);
      if (!args.title || !args.gameApiId) {
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
