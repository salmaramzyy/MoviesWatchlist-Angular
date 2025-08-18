import { Routes } from '@angular/router';
import { Home} from './home/home';
import { Search } from './search/search';
import { Watchlist} from './watchlist/watchlist';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'search', component: Search},
  { path: 'watchlist', component: Watchlist},
];
