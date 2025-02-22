import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-acount',
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent, RouterLink, FormsModule],
  templateUrl: './create-acount.component.html',
  styleUrl: './create-acount.component.css'
})
export class CreateAcountComponent {
  selectedRole: string = 'alumno';
  alumnoForm: FormGroup;
  maestroForm: FormGroup;
  errorMessage : String = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
    private authService : AuthService
  ) {
    // Inicializar formulario de alumno
    this.alumnoForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      codigo_maestro: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    // Inicializar formulario de maestro
    this.maestroForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      codigo_directivo: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmitAlumno() {
    if (this.alumnoForm.valid) {
      console.log('Formulario de alumno:', this.alumnoForm.value);
      this.errorMessage = '';
      this.isLoading = true;
      this.authService.singupAlumno(this.alumnoForm.value).subscribe({
        next : (response) =>{
          console.log("Singup existoso", response);
          this.isLoading=false;
        },
        error : (error)=>{
          console.log("Error:", error);
          // Asignar el mensaje de error a la variable errorMessage
          if (error.error && error.error.error) {
            this.errorMessage = error.error.error;  // Esto asume que el error es del tipo {error: 'Código de profesor inválido'}
          } else {
            this.errorMessage = 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
          }
          this.isLoading = false;
        }
      })

      
    }
  }

  onSubmitMaestro() {
    if (this.maestroForm.valid) {
      console.log('Formulario de maestro:', this.maestroForm.value);
      this.errorMessage = '';
      this.isLoading = true;
      this.authService.singupProfesor(this.maestroForm.value).subscribe({
        next : (response) =>{
          console.log("Singup existoso", response);
          this.isLoading=false;
        },
        error : (error)=>{
          console.log("Error:", error);
          // Asignar el mensaje de error a la variable errorMessage
          if (error.error && error.error.error) {
            this.errorMessage = error.error.error;  // Esto asume que el error es del tipo {error: 'Código de profesor inválido'}
          } else {
            this.errorMessage = 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
          }
          this.isLoading = false;
        }
      })
    }
  }
}
