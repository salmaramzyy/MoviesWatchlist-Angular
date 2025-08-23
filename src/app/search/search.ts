import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from '../movie.service';
import { MovieCardComponent } from "../movie-card/movie-card";
import { Header } from "../header/header";
import { WatchlistService } from '../watchlist.service';

// Debounce function
const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  let timeoutTimer: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timeoutTimer);

    timeoutTimer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    HttpClientModule, 
    MovieCardComponent, 
    Header, 
     
  ],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search implements OnInit {
  searchQuery = '';
  movies: any[] = [];
  hasSearched = false; 
  currentPage = 1;
  totalResults = 0;
  loading = false;

  debouncedSearch: (query: string) => void;

  constructor(
    private movieService: MovieService, 
    private watchlistService: WatchlistService
  ) {
    this.debouncedSearch = debounce((query: string) => {
      this.resetAndSearch(query);
    }, 500);
  }

  ngOnInit() {
    this.loadMovies();
  }

  private resetAndSearch(query: string) {
    this.currentPage = 1;
    this.movies = [];
    this.searchMovies(query, this.currentPage);
  }

  private searchMovies(query: string, page: number) {
    this.hasSearched = true;
    this.loading = true;

    if (query.trim()) {
      this.movieService.searchMovies(query, page).subscribe((data: any) => {
        console.log('TMDB search response:', data); 
        this.totalResults = data.total_results || 0;

        const newMovies = (data.results || []).map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date ,
          poster: movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'assets/no-poster.png',
          rating: movie.vote_average,  
        vote_average:movie.vote_average ,  
           
        }));


        this.movies = [...this.movies, ...newMovies];
        this.loading = false;
      });
    } else {
      this.loadMovies(page);
    }
  }

  private loadMovies(page: number = 1) {
    this.loading = true;
    this.movieService.getDefaultMovies(page).subscribe((data: any) => {
      console.log('TMDB default movies:', data);
      this.totalResults = data.total_results || 0;

      const newMovies = (data.results || []).map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date ,
        poster: movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'assets/no-poster.png',
        vote_average:movie.vote_average ,  
        rating: movie.rating || 0
      }));

      this.movies = [...this.movies, ...newMovies];
      this.loading = false;
    });
  }

  loadMore() {
    this.currentPage++;
    if (this.searchQuery.trim()) {
      this.searchMovies(this.searchQuery, this.currentPage);
    } else {
      this.loadMovies(this.currentPage);
    }
  }

  onAddToWatchlist(movie: any) {
    this.watchlistService.addMovie(movie);
    alert('🎬 Movie added to Watchlist ✅');
  }

  updateMovieRating(event: { id: number, rating: number }) {
    const movie = this.movies.find(m => m.id === event.id);
    if (movie) {
      movie.rating = event.rating;
    }
    this.watchlistService.updateRating(event.id, event.rating);
  }
}
