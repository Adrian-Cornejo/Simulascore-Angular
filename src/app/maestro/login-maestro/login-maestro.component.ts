import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-maestro',
  imports: [ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './login-maestro.component.html',
  styleUrl: './login-maestro.component.css'
})
export class LoginMaestroComponent {
  loginForm!: FormGroup;
  hidePassword = true;
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
    this.authService.login(this.loginForm.value).subscribe({
      next : (response)=>{
        console.log("Login Exitoso", response);
      },
      error :(error)=>{
        console.log("Error", error);
      }
    })
  }
}
togglePasswordVisibility(){
  this.hidePassword = !this.hidePassword;
  console.log('hola')
}

}
