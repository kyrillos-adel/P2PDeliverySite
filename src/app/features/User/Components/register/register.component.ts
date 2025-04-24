import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../Services/Register_auth.service'; 
import { NgFor, NgIf } from '@angular/common';
import { passwordMatchValidator } from '../../../../core/validators/password-match.validator'; 
import { Router,RouterLink 
 } from '@angular/router';
import { egyptGovernorates } from '../../../../models/Register/register.model';


@Component({
  imports: [ReactiveFormsModule, NgIf, NgFor, RouterLink],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent {
  registerForm!: FormGroup;
  notvalidemail: string = "";
  notvalidusername: string = "";
  egyptGovernorates = egyptGovernorates;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      natId: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(2|3)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{2}\d{5}$/)
        ]
      ],
      fullName: [
        '', 
        [
          Validators.required, 
          Validators.minLength(5), 
          Validators.maxLength(12),
          Validators.pattern('^[a-zA-Z ]+$')
        ]
      ],
      userName: [
        '', 
        [Validators.required, Validators.minLength(4), Validators.maxLength(10)]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ]
      ],
      phone: [
        '', 
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]
      ],
      address: ['', Validators.required],
      password: [
        '', 
        [
          Validators.required, 
          Validators.minLength(6), 
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/)
        ]
      ],
      confirmPassword: ['', Validators.required],
    }, {
      validators: passwordMatchValidator('password', 'confirmPassword')
    });
  }

  ngOnInit(): void {
    // Reset error messages on form control value changes
    this.registerForm.get('email')?.valueChanges.subscribe(() => {
      const emailControl = this.registerForm.get('email');
      if (emailControl?.valid) {
        this.notvalidemail = ''; // Clear email error message
      }
    });

    this.registerForm.get('userName')?.valueChanges.subscribe(() => {
      const userNameControl = this.registerForm.get('userName');
      if (userNameControl?.valid) {
        this.notvalidusername = ''; // Clear username error message
      }
    });
    
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.authService.register(formData).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            alert('Registration successful!');
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.handleErrorResponse(error);
        }
      });
    } else {
      console.log("Form is invalid");
    }
  }
  private handleErrorResponse(error: any) {
    const errorMsg = error?.error?.message;
  
    if (errorMsg === "user is exist") {
      this.notvalidusername = errorMsg;
      this.notvalidemail = '';
    } else if (errorMsg?.includes("Email")) {
      this.notvalidemail = errorMsg;
      this.notvalidusername = '';
    } else {
      // Handle other unexpected messages
      this.notvalidusername = '';
      this.notvalidemail = '';
      console.error("Unhandled error message:", errorMsg);
    }
  }
  

  // Getters for form controls
  get natId() {
    return this.registerForm.get('natId');
  }
  
  get fullName() {
    return this.registerForm.get('fullName');
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
