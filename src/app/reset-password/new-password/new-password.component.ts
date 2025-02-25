import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NewPasswordRequest } from '../../models/request/new-password-request.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-new-password',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],  
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup;
  token: string = '';
  message = '';
  messageType: 'success' | 'error' | '' = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] || '';
    this.initForm();
  }

  private initForm(): void {
    this.newPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator()
    });
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      
      return password && confirmPassword && password.value !== confirmPassword.value
        ? { passwordMismatch: true }
        : null;
    };
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.newPasswordForm.get(fieldName);
    return field ? (field.invalid && field.touched) : false;
  }

  shouldShowError(fieldName: string): boolean {
    const field = this.newPasswordForm.get(fieldName);
    return field ? (field.invalid && field.touched) : false;
  }

  onSubmit(): void {
    if (this.newPasswordForm.valid && this.token) {
      this.isLoading = true;
      this.message = '';
  
      const request: NewPasswordRequest = {
        token: this.token,
        newPassword: this.newPasswordForm.get('password')?.value
      };
  
      this.authService.resetPassword(request).subscribe({
        next: () => {
          this.message = 'Contraseña restablecida correctamente.';
          this.messageType = 'success';
          this.newPasswordForm.reset();
          this.isLoading = false;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);
        },
        error: (err) => {
          console.log(err);
          this.message = err.error.error || 'Error al restablecer la contraseña.';
          this.messageType = 'error';
          this.isLoading = false;
        }
      });
    } else {
      Object.keys(this.newPasswordForm.controls).forEach(key => {
        const control = this.newPasswordForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}