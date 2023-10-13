import {Game} from '../interfaces/Game';
import {VerboseGame} from '../interfaces/VerboseGame';
import RawgToGame from './RawgToGame';

/**
 * @param id The RAWG API id of the game to search for.
 * @returns a singular 'VerboseGame' object matching the query id.
 */
const fetchById = async (id: string) => {
  const res = await fetch(
    `${process.env.RAWG_API_URL}games/${id}?key=${process.env.RAWG_API_KEY}`,
    {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.RAWG_API_KEY as string,
      },
    }
  );
  const data = await res.json();

  const game: VerboseGame = RawgToGame.formatTile(data);
  return game;
};
/**
 * @param name a string containing the name of the game to search for.
 * @returns an array of 'Game' objects matching the search query.
 */
const fetchByName = async (name: string) => {
  const res = await fetch(
    `${process.env.RAWG_API_URL}games?key=${process.env.RAWG_API_KEY}&search=${name}`,
    {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.RAWG_API_KEY as string,
      },
    }
  );

  const data = await res.json();
  const gameArr: VerboseGame[] = [data.count];

  for (let index = 0; index < data.results.length; index++) {
    gameArr[index] = RawgToGame.formatTile(data.results[index]);
  }
  return gameArr;
};

export {fetchById, fetchByName};
