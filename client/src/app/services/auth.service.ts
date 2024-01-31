import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44330/api/User';

  constructor(private http: HttpClient,private router: Router) { }

  registerUser(userData: { username: string, password: string }): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, userData);
  }

  loginUser(userData: any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<string>(`${this.apiUrl}/login`, userData, 
    {headers, responseType: 'text' as 'json'});
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding JWT token', e);
      return null;
    }
  }

}
