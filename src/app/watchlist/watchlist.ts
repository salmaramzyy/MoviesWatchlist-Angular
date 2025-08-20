import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistService } from '../watchlist.service';
import { Header } from "../header/header";
import { MovieCardComponent } from "../movie-card/movie-card";

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, Header, MovieCardComponent],
  templateUrl: './watchlist.html'
})
export class Watchlist {
  readonly movies$;

  constructor(private watchlistService: WatchlistService) {
    this.movies$ = this.watchlistService.watchlist$;
  }

  removeFromWatchlist(id: number) {
  this.watchlistService.removeMovie(id);
}

updateMovieRating(event: { id: number, rating: number }) {
  this.watchlistService.updateRating(event.id, event.rating);
}

}
