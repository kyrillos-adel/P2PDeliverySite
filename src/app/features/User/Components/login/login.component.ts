import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Login.auth.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formError: string | null = null;
  usernError: string | null = null;
  passwordError: string | null = null;
  deletedAcountError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router)
   {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
   }

  ngOnInit(): void {
    // 🔐 1. Check for token in localStorage or sessionStorage
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token && token.split('.').length === 3) {
      try {
        const decoded: any = jwtDecode(token);
        const exp = decoded.exp * 1000; // Convert to ms
        const now = Date.now();

        if (now < exp) {
          this.router.navigate(['/']);
          return;
        } else {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
    }

   
    this.loginForm.valueChanges.subscribe(() => {
      this.usernError = null;
      this.passwordError = null;
      this.deletedAcountError = null;
      this.formError = null;
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.formError = 'Please fill in all required fields.';
      this.usernError = this.loginForm.get('identifier')?.hasError('required') ? 'Username or email is required' : null;
      this.passwordError = this.loginForm.get('password')?.hasError('required') ? 'Password is required' : null;
      return;
    }
  
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.usernError = '';
        this.passwordError = '';
  
        if (response.isSuccess) {
          alert('Login successful!');
          const token = response.data?.token;
  
          if (this.loginForm.value.rememberMe) {
            localStorage.setItem('token', token);
          } else {
            sessionStorage.setItem('token', token);
          }
  
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
  
        const message = error?.error?.message;
  
        if (message === 'Wrong email or user-name') {
          this.usernError = message;
        } else if (message === 'Wrong password') {
          this.passwordError = message;
        } else {
          alert('Login failed: ' + (message || 'Please try again later.'));
        }
      }
    });
  }
  

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
