import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

  // private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  errorMessage = signal<string>('');
  isLoading = signal(false);
  
  loginForm= new FormGroup ({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/events']);
    }
  }

  onSubmit(): void {
    const { email, password } = this.loginForm.getRawValue();

    if (this.loginForm.invalid) return;
    
    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/admin/events']);
      },
      error: (err) => {
        this.isLoading.set(false);

        this.errorMessage.set(err.error?.error || 'Credenciais inválidas');
      }
    });

    this.isLoading.set(true);
    this.errorMessage.set('');

  }
}