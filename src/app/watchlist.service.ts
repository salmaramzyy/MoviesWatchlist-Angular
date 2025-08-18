import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private storageKey = 'myWatchlist';
  private watchlistSource = new BehaviorSubject<any[]>(this.loadFromStorage());
  watchlist$ = this.watchlistSource.asObservable();

  private loadFromStorage(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(movies: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(movies));
  }

  get watchlist(): any[] {
    return this.watchlistSource.value;
  }

  addMovie(movie: any) {
    const updated = [...this.watchlistSource.value];
    if (!updated.some(m => m.imdbID === movie.imdbID)) {
      updated.push(movie);
      this.watchlistSource.next(updated);
      this.saveToStorage(updated);  // persist
    }
  }

  removeMovie(imdbID: string) {
    const updated = this.watchlistSource.value.filter(m => m.imdbID !== imdbID);
    this.watchlistSource.next(updated);
    this.saveToStorage(updated);  // persist
  }
}
