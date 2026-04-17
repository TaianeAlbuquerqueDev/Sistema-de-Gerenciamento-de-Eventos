import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class Auth {

  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = "https://api-senai-angular.vercel.app/api/events";

login(email: string, password: string): Observable<{ token: string }> {
  return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
    tap(response => {
      localStorage.setItem('token', response.token);
    })
  );
}
 
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Retorna o token atual (ou null se não existir)
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role ?? null;
    } catch {
      return null;
    }
  }
}