import { Routes } from '@angular/router';
import { Home} from './home/home';
import { Search } from './search/search';
import { WatchlistComponent} from './watchlist/watchlist';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'search', component: Search},
  { path: 'watchlist', component: WatchlistComponent },
];
