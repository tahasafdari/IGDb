import checkAuth from '../../functions/checkAuth';
import {Game} from '../../interfaces/Game';
import {UserIdWithToken} from '../../interfaces/User';
import {VerboseGame} from '../../interfaces/VerboseGame';
import {fetchById, fetchByName} from '../../utils/api-fetcher';
import gameModel from '../models/gameModel';
import {GraphQLError} from 'graphql';

export default {
  Query: {
    /**
     * Retrieve a list of games.
     * @param _: Unused
     * @param __: Unused
     * @param user: User with a valid token
     * @returns An array of games
     */
    games: async (_: undefined, __: undefined, user: UserIdWithToken) => {
      checkAuth(user);
      const games = gameModel.find() as unknown as Game[];
      return games;
    },

    /**
     * Retrieve a game by its ID.
     * @param _: Unused
     * @param args: Arguments containing gameId
     * @param user: User with a valid token
     * @returns The requested game
     * @throws GraphQLError if the game is not found
     */
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

    /**
     * Retrieve a game by its title.
     * @param _: Unused
     * @param args: Arguments containing title
     * @param user: User with a valid token
     * @returns The requested game
     * @throws GraphQLError if the game is not found
     */
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

    /**
     * Retrieve a game by its API ID.
     * @param _: Unused
     * @param args: Arguments containing gameApiId
     * @param user: User with a valid token
     * @returns The requested game
     * @throws GraphQLError if the game is not found
     */
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

    /**
     * Retrieve external games by their name using an external API.
     * @param _: Unused
     * @param args: Arguments containing name
     * @param user: User with a valid token
     * @returns An array of external games
     * @throws Error if there's an issue fetching external games
     */
    externalGamesByName: async (
      _: undefined,
      args: {name: string},
      user: UserIdWithToken
    ) => {
      checkAuth(user);
      try {
        const games: VerboseGame[] = await fetchByName(args.name);
        return games;
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Retrieve an external game by its API ID using an external API.
     * @param _: Unused
     * @param args: Arguments containing gameApiId and mode
     * @param user: User with a valid token
     * @returns The requested external game
     * @throws Error if there's an issue fetching the external game
     */
    externalGameByApiId: async (
      _: undefined,
      args: {gameApiId: number; mode: number},
      user: UserIdWithToken
    ) => {
      checkAuth(user);
      try {
        const game = await fetchById(args.gameApiId.toString());
        return game;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    /**
     * Create a new game.
     * @param _: Unused
     * @param args: Arguments containing game details
     * @param user: User with a valid token
     * @returns The newly created game
     * @throws GraphQLError if required fields are missing
     */
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
