import {Game} from '../interfaces/Game';
import RawgToGame from './RawgToGame';


const fetchById = async (id: string) => {
  return (await fetch(`https://api.rawg.io/api/games/${id}`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': process.env.RAWG_API_KEY as string,
    },
  })
    .then((res) => res.json())
    .then((data) => data)) as unknown as Game;
};

const fetchByName = async (name: string) => {
  const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${name}`, {
    method: 'GET',
    headers: {
        'X-Auth-Token': process.env.RAWG_API_KEY as string,
    },
  });

  const data = await res.json();
  const gameArr: Game[] = [data.count];

  console.log(data.results.length);
  
  for (let index = 0; index < data.results.length; index++) {    
    gameArr[index] = RawgToGame.format(data.results[index]);
  }
  return gameArr;
};

export {fetchById, fetchByName};
