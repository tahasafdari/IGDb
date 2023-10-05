import {Game} from '../interfaces/Game';
import RawgToGame from './RawgToGame';

const fetchById = async (id: string, mode: number) => {
  console.log(`${process.env.RAWG_API_URL}games/${id}?key=${process.env.RAWG_API_KEY}`);
  
  const res = await fetch(
    `${process.env.RAWG_API_URL}games/${id}?key=${process.env.RAWG_API_KEY}`,
    {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.RAWG_API_KEY as string,
      },
    }
  )
  const data = await res.json();

  console.log(data.background_image);

  switch (mode) {
    case 0:
      return RawgToGame.format(data);
    case 1:
      console.log("getting tile");
      
      return RawgToGame.formatTile(data);
    default: 
      return RawgToGame.format(data);
        }
};

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
  const gameArr: Game[] = [data.count];
  console.log(data.results[0]);
  console.log(data.results.length);

  for (let index = 0; index < data.results.length; index++) {
    gameArr[index] = RawgToGame.format(data.results[index]);
  }
  return gameArr;
};

export {fetchById, fetchByName};
