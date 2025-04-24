import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../Services/Login.auth.service';
import { Router } from '@angular/router';
import { egyptGovernorates } from '../../../../models/Register/register.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  imports: [CommonModule, FormsModule,RouterLink, RouterLinkActive],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent  implements OnInit {
  private authService = inject(AuthService);
  constructor(private router: Router) {}

  user: any = {};
  loading = false;
  notvalidemail: string | null = null;
  editingProfile: boolean = false;


  errors = {
    fullName: '',
    email: '',
    phone: ''
  };

  showPopup = false;
  egyptGovernorates = egyptGovernorates;

  ngOnInit(): void {
    if (!this.authService.hasToken()) {
      this.router.navigate(['/login']);
      return;
    }
  
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Failed to load user:', err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
    
  }
  

  loadUser() {
    if (this.authService.hasToken()) {
    this.authService.getUserProfile().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error('Failed to load user:', err);
      }
    });
  }
  else {
    this.router.navigate(['/login']);
  return;}
  }
  validate(): boolean {
    let isValid = true;
    this.errors = { fullName: '', email: '', phone: '' };

    if (!this.user.fullName || this.user.fullName.trim().length < 3) {
      this.errors.fullName = 'Full name is required and must be at least 3 characters.';
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.user.email || !emailPattern.test(this.user.email)) {
      this.errors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (this.user.phone && !/^(010|011|012|015)\d{8}$/.test(this.user.phone)) {
      this.errors.phone = 'Phone must be a valid Egyptian number starting with 010, 011, 012, or 015.';
      isValid = false;
    }
    return isValid;
  }
  startEdit() {
    this.editingProfile = true;
  }
  saveProfile() {
    if (!this.validate()) {
      
      return;
    }
  
    this.loading = true;
    this.authService.updateUser(this.user).subscribe({
      next: () => {
        alert('User updated successfully!');
        this.loading = false;
        this.loadUser();
        this.editingProfile = false;
      },
      error: (err) => {
        console.error('Update failed:', err);
  
        if (err.error && err.error.message === 'Email is already taken.') {
          this.notvalidemail = 'Email is already taken. Please choose another one.';
        } else {
          this.notvalidemail = 'An error occurred. Please try again later.';
        }
  
        this.loading = false;
      }
      
    });
  }
  

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  cancelEdit() {
    this.editingProfile = false; 
    this.loadUser(); 

  }
}
