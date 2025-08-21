import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Search } from './search/search';
import { Watchlist } from './watchlist/watchlist';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'search', component: Search, canActivate: [AuthGuard] },
  { path: 'watchlist', component: Watchlist, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
