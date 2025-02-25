import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],  
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent  implements OnInit{
  resetForm !: FormGroup;
  message = '';
  isLoading = false;
  messageType: 'success' | 'error' | ''='';

  constructor(private authService : AuthService,
    private fb : FormBuilder
  ){

  }
  ngOnInit(): void {
    this.resetForm = this.fb.group({
      correo : ['',[Validators.required, Validators.email]]
    })
      
  }
  onSubmit(){
    if(this.resetForm.valid){
      this.message ='';
      this.isLoading = true;
      console.log(this.resetForm.value)
      this.authService.requestPaswordReset(this.resetForm.value).subscribe({
        next : ()=>{
          this.message ='Se ha enviado un enlace a tu correo electronico.';
          this.messageType = 'success';
        },
        error : (err)=>{
          this.message = err.error.error || 'Error al solicitar reestablecimiento';
          this.messageType = 'error';
        }
      })
    }
  }

}
