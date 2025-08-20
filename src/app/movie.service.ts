// movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = environment.tmdbApiUrl;
  private token = environment.tmdbReadAccessToken;

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  // Search movies
  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie`, {
      headers: this.getHeaders(),
      params: { query, page }
    });
  }

  // Default movies
  getDefaultMovies(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/popular`, {
      headers: this.getHeaders(),
      params: { page }
    });
  }

  // Movie details
  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}`, {
      headers: this.getHeaders()
    });
  }
}
