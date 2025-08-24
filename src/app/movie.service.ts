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
  private apiKey: string = '255ab5317bb98af218b92ff37ebc0926';
  
  private headers = {
    headers: {
      Authorization: `Bearer ${environment.tmdbApiKey}`,
      accept: 'application/json'
    }
  };

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

  getMovieDetails(id: number): Observable<any> {
  const url = `${this.apiUrl}/movie/${id}?language=en-US&append_to_response=credits,videos,images,recommendations,similar,reviews,release_dates`;
  return this.http.get(url, {
    headers: { Authorization: `Bearer ${this.token}` }
  });
}

getConfiguration() {
    return this.http.get(`${this.apiUrl}/configuration`, this.headers);
  }

  getCollectionImages(collectionId: number) {
    return this.http.get(`${this.apiUrl}/collection/${collectionId}/images`, this.headers);
  }

  getMovieVideos(movieId: number) {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.apiKey}&language=en-US`
    );
  }


}


