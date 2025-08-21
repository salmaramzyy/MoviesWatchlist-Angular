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

  // addMovie(movie: any) {
  //   const updated = [...this.watchlistSource.value];
  //   if (!updated.some(m => m.id === movie.id)) {
  //     updated.push({ ...movie, rating: movie.vote_average || 0 });  
  //     this.watchlistSource.next(updated);
  //     this.saveToStorage(updated);
  //   }
  // }

addMovie(movie: any) {
  const current = this.watchlistSource.value;
  if (!current.find(m => m.id === movie.id)) {
    const updated = [
      ...current,
      { ...movie, vote_average: movie.vote_average, rating: movie.vote_average || 0 }
    ];
    this.watchlistSource.next(updated);
    this.saveToStorage(updated);
  }
}


removeMovie(id: number) {
  const updated = this.watchlistSource.value.filter(m => m.id !== id);
  this.watchlistSource.next(updated);
  this.saveToStorage(updated);
}

updateRating(id: number, rating: number) {
  const updated = this.watchlistSource.value.map(m =>
    m.id === id ? { ...m, rating } : m
  );
  this.watchlistSource.next(updated);
  this.saveToStorage(updated);
}

}
