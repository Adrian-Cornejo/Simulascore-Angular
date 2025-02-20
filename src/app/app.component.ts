import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(
    private authService : AuthService,
  ){}

  ngOnInit(): void {
    const token = this.authService.getToken();
    const role = this.authService.getRole();
    if(token && role){
      this.authService.redirectBasedOnRole(role);
    }
  }

  title = 'Simulascore-Front';
}
