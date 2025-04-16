import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import{ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../Services/Register_auth.service'; 
import { NgFor, NgIf } from '@angular/common';
import { usernameExistsValidator } from '../../../../core/validators/username-exists.validator';
import { passwordMatchValidator } from '../../../../core/validators/password-match.validator'; 
import { Router } from '@angular/router';
@Component({
  imports: [ReactiveFormsModule, NgIf,NgFor],
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  notvaldemail:string="";
  egyptGovernorates: string[] = [
    'Cairo',
    'Giza',
    'Alexandria',
    'Qalyubia',
    'Port Said',
    'Suez',
    'Dakahlia',
    'Sharqia',
    'Kafr El Sheikh',
    'Gharbia',
    'Monufia',
    'Beheira',
    'Ismailia',
    'Fayoum',
    'Beni Suef',
    'Minya',
    'Asyut',
    'Sohag',
    'Qena',
    'Luxor',
    'Aswan',
    'Red Sea',
    'New Valley',
    'Matrouh',
    'North Sinai',
    'South Sinai',
    'Damietta'
  ];
  

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerForm = this.fb.group({
      natId: [''],
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12),Validators.pattern('^[a-zA-Z ]+$')]],
      userName: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(10)],
        [usernameExistsValidator(this.authService)]
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      address: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/)
      ]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator('password', 'confirmPassword')
    
    });
  }
  ngOnInit(): void {
    this.registerForm.get('email')?.valueChanges.subscribe(() => {
      const emailControl = this.registerForm.get('email');
      if (emailControl?.valid && this.notvaldemail) {
        this.notvaldemail = ''; // clear the message
      }
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      this.notvaldemail = '';
      const formData = this.registerForm.value;
     

      this.authService.register(formData).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            alert('Registration successful!');
            this.router.navigate(['/login']);
          }
          else if (response.isSuccess == false) {
            this.notvaldemail = response.message;
            console.log(response)
          }
          
        },
        error: (error) => {
          console.error('Registration failed', error);
        }
      });
    } else {
      console.log("Form is invalid");
    }
  }

  // ✅ Add your form control getters here
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
