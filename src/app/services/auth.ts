import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class Auth {

  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = "https://api-senai-angular.vercel.app/api/auth";
  private TOKEN_KEY= "auth_token";

  login(email: string, password: string): Observable<any> {
    return this.http.post<{token: string}>(this.apiUrl + "/login", {email, password})
    .pipe(tap((resp) => {localStorage.setItem(this.TOKEN_KEY, resp.token);
    }))
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // getRole(): string | null {
  //   const token = this.getToken();
  //   if (!token) return null;
  //   try {
  //     const payload = JSON.parse(atob(token.split('.')[1]));
  //     return payload.role ?? null;
  //   } catch {
  //     return null;
  //   }
  // }
}