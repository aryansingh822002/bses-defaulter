import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:5001/api/auth'; 

  constructor(private http: HttpClient) {}

  login(data: any): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(`${this.baseUrl}/login`, data)
      .pipe(
        tap(response => {
          if (response.token) {
            this.setToken(response.token);
          }
        })
      );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/changepassword`, data);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    const decoded: any = (jwtDecode as any)(token);
    const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (role) {
      localStorage.setItem('role', role);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
