import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  errorMessage : String = '';
  hidePassword = true;
  isLoading: boolean = false;
constructor(
  private fb: FormBuilder,
  private authService: AuthService,
){

}

ngOnInit(): void {
  this.loginForm = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

onSubmit(): void {
  if (this.loginForm.valid) {
    this.errorMessage = '';
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next : (response)=>{
        console.log("Login Exitoso", response);
        this.isLoading = false;
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Credenciales inválidas. Inténtalo de nuevo.';
        } else if (error.status === 500) {
          this.errorMessage = 'Error en el servidor. Inténtalo más tarde.';
        } else if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a Internet.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Inténtalo más tarde.';
        }
        this.isLoading = false;
      },
    })
  }
}
togglePasswordVisibility(){
  this.hidePassword = !this.hidePassword;
  console.log('hola')
}

}
