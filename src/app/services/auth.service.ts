import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // URL de la API desde environment

  constructor(private http: HttpClient, private router: Router) {}

  // Método para realizar el login
  login(credentials: { correo: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, credentials).pipe(
      tap((response) => {
        // Guardar el token y los datos del usuario en localStorage
        this.saveAuthData(response);
        // Redireccionar según el rol
        this.redirectBasedOnRole(response.role);
      })
    );
  }

  // Método para guardar el token y los datos del usuario en localStorage
  private saveAuthData(response: any): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', response.userId);
    localStorage.setItem('role', response.role);
  }

  // Método para redireccionar según el rol
  private redirectBasedOnRole(role: string): void {
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

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['']);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para obtener el rol del usuario
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para obtener los datos del usuario
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}