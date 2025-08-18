import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../movie.service';
import { MovieCardComponent } from "../movie-card/movie-card";
import { Header } from "../header/header";
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, MovieCardComponent, Header],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search {

  searchQuery = '';
  movies: any[] = [];
  hasSearched = false; 

  constructor(private movieService: MovieService, private watchlistService: WatchlistService) {}


  onSearch() {
    this.hasSearched = true;

    if (this.searchQuery.trim()) {
      this.movieService.searchMovies(this.searchQuery).subscribe((data: any) => {
        this.movies = data.Search || [];
      });
    } else {
      this.movies = []; 
    }
  }

onAddToWatchlist(movie: any) {
  this.watchlistService.addMovie(movie);
  alert('🎬 Movie added to Watchlist ✅');
}




}