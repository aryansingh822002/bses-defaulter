import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5044/api/auth';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, data).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    const decoded: any = jwtDecode(token);
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

    if (role) localStorage.setItem('role', role);
    if (username) localStorage.setItem('username', username);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.clear();
  }

  /** Fetch all roles from backend - useful for role-based logic or dropdowns */
  getAvailableRoles(): Observable<any> {
    const token = this.getToken();
    return this.http.get(`${this.baseUrl}/roles`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
