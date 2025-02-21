import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginCredentials } from '../models/login-credentials.model';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // URL de la API desde environment

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  // Método para iniciar sesión
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}login`, credentials).pipe(
      tap((response) => {
        this.saveAuthData(response);
        this.redirectBasedOnRole(response.role);
      })
    );
  }

  // Método para guardar el token y los datos del usuario en localStorage
  private saveAuthData(response: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.userId)); // Asegurar que el ID se guarde correctamente
      localStorage.setItem('role', response.role);
    }
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  // Método para obtener el rol del usuario
  getRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role');
    }
    return null;
  }

  // Método para obtener el token
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Método para obtener los datos del usuario
  getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  // Método para cerrar sesión
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
    }
    this.router.navigate(['']);
  }

  // Método para redireccionar según el rol
  redirectBasedOnRole(role: string): void {
    switch (role) {
      case 'Alumno':
        this.router.navigate(['/alumno']);
        break;
      case 'Profesor':
        this.router.navigate(['/profesor']);
        break;
      case 'Directivo':
        this.router.navigate(['/directivo']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }
}
