import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlist: any[] = [];

  getWatchlist() {
    return this.watchlist;
  }

  addToWatchlist(movie: any) {
    if (!this.watchlist.find(m => m.imdbID === movie.imdbID)) {
      this.watchlist.push(movie);
    }
  }

  removeFromWatchlist(movieId: string) {
    this.watchlist = this.watchlist.filter(m => m.imdbID !== movieId);
  }
}
