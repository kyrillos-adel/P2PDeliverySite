import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../Services/Login.auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { egyptGovernorates } from '../../../../models/Register/register.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  private authService = inject(AuthService);
  constructor(private router: Router) {}

  user: any = {};
  showPopup = false;
  loading = false;
  egyptGovernorates = egyptGovernorates;
  notvalidemail: string | null = null;
  editingProfile = false; 



  // Error tracking
  errors = {
    fullName: '',
    email: '',
    phone: ''
  };

  ngOnInit(): void {
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
    this.authService.getUserProfile().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.error('Failed to load user:', err);
      }
    });
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
  logout() {
    this.authService.logout();
    this.togglePopup();

  }
  cancelEdit() {
    this.editingProfile = false; 
  }
  deleteAccount() {
    this.authService.deleteUser().subscribe({
      next: () => {
        alert('Account deleted successfully!');
        this.logout();
        // Redirect to login page after deletion
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Failed to delete account:', err);
      }
    });
    
  }
}
