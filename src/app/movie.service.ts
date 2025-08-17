import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = environment.omdbApiUrl;
  private apiKey = environment.omdbApiKey;

  constructor(private http: HttpClient) { }

  searchMovies(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?s=${title}&apikey=${this.apiKey}`);
  }

  getMovieDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?i=${id}&apikey=${this.apiKey}`);
  }
}
