import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'https://ecommerce.routemisr.com/api/v1/auth/signup';
  private loginUrl = 'https://ecommerce.routemisr.com/api/v1/auth/signin';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(this.loginUrl, userData);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
