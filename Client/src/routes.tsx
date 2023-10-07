import { IRoute } from './types/navigation'
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';

const routes: IRoute[] = [
    {
        name : 'Home',
        path : '/dashboard',
        icon : HomeIcon,
    } ,
    {     
        name : 'Games',
        path : '/games',
        icon : SportsEsportsIcon,
    } ,
    {
        name : 'REVIEWS',
        path : '/reviews',
        icon : ReviewsIcon,
    } ,
    {
        name : 'Top 10',
        path : '/top10',
        icon : AirlineStopsIcon,
    } 

]

export default routes;