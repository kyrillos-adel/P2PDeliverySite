import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Login.auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
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
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const expStr = localStorage.getItem('exp') || sessionStorage.getItem('exp');

    if (token && expStr) {
      const now = Date.now();
      const exp = parseInt(expStr);
    
      if (now < exp) {
        this.router.navigate(['/']);
        return;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('exp');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('exp');
        this.router.navigate(['/login']);
        alert('Session expired. Please log in again.');

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
    this.formError = null;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {

        console.log('API response:', response);
        this.usernError = '';
        this.passwordError = '';
  
        if (response.isSuccess) {
          alert(' Welcome To P2P Login successful!');
          
          if (this.loginForm.value.rememberMe) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('exp', new Date(response.data.expiration).getTime().toString());
          } else {
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('exp', new Date(response.data.expiration).getTime().toString());

          }
          this.router.navigate(['/deliveryrequests/getallDRs']);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
  
        const message = error?.error?.message;
  
        if (message === 'Wrong email or user-name') {
          this.usernError = message;
        } else if (message === 'Wrong password') {
          this.passwordError = message;}
          else if (message === 'Account has been deleted.') {
            this.deletedAcountError = message;
          
        } else {
          alert('Login failed: ' + (message || 'Please try again later.'));
        }
      }
    });
  }

  recoveraccount() {
    const identifier = this.loginForm.get('identifier')?.value;
    if (!identifier) {
      this.formError = 'Please enter a username or email to recover the account.';
      return;
    }
    console.log(identifier)
  
    this.formError = null;
    this.authService.recoverAccount(identifier).subscribe({
      next: (response) => {
        console.log('Recover account response:', response);
        if (response.isSuccess) {
          alert('Account recovery initiated successfully! Please check your email for further instructions.');
          this.deletedAcountError = null;
        } else {
          alert('Account recovery failed: ' + (response.message || 'Please try again later.'));
        }
      },
      error: (error) => {
        console.error('Recover account error:', error);
        alert('Account recovery failed: ' + (error?.error?.message || 'Please try again later.'));
      }
    });
  }
  
  logout() {
    this.authService.logout();

    this.router.navigate(['/login']);
  }


  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return null;
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload?.UserId || payload?.userId || null;
  }
}
