import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, MatCardModule, MatIconModule, MatFormFieldModule, MatProgressSpinnerModule, MatDividerModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;
  isLoading = false;

  stats = {
    students: 15420,
    courses: 156,
    instructors: 89,
    satisfaction: 98
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;

      // Simular proceso de login
      setTimeout(() => {
        this.isLoading = false;

        const { email, password } = this.loginForm.value;

        // Simulación de login exitoso
        if (email === 'admin@admin.com' && password === '123456') {
          this.router.navigate(['/dashboard']);

          // Navegar a la página de cursos después del login
          setTimeout(() => {
            this.router.navigate(['/courses']);
          }, 1000);
        } else {
          this.snackBar.open('Credenciales incorrectas. Intenta con admin@admin.com / 123456', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);

    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (field === 'email' && control?.hasError('email')) {
      return 'Ingresa un email válido';
    }

    if (field === 'password' && control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }

    return '';
  }

  navigateToCourses(): void {
    this.router.navigate(['/cursos']);
  }
}
