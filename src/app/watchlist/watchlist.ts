import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../services/watchlist.service';
import { MovieCardComponent } from "../movie-card/movie-card";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.html',
  styleUrls: ['./watchlist.css'],
  imports: [MovieCardComponent]
})
export class WatchlistComponent implements OnInit {
  watchlist: any[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit() {
    this.watchlist = this.watchlistService.getWatchlist();
  }
}
