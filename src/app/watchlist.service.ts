import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlistSource = new BehaviorSubject<any[]>([]);
  watchlist$ = this.watchlistSource.asObservable();

  get watchlist(): any[] {
    return this.watchlistSource.value;
  }

  addMovie(movie: any) {
    const updated = [...this.watchlistSource.value];

    
    if (!updated.some(m => m.imdbID === movie.imdbID)) {
      updated.push(movie);
      this.watchlistSource.next(updated);
    }
  }

  removeMovie(imdbID: string) {
    const updated = this.watchlistSource.value.filter(m => m.imdbID !== imdbID);
    this.watchlistSource.next(updated);
  }
}
