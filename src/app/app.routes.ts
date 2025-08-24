import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Search } from './search/search';
import { Watchlist } from './watchlist/watchlist';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { AuthGuard } from './auth.guard';
import { MovieDetailsComponent } from './movie-details/movie-details';
import { LogoutComponent } from './logout/logout';

export const routes: Routes = [
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'search', component: Search, canActivate: [AuthGuard] },
  { path: 'movie/:id', component: MovieDetailsComponent ,canActivate: [AuthGuard]  },
  { path: 'watchlist', component: Watchlist, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
