import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../Services/Login.auth.service';
import { Router } from '@angular/router';
import { egyptGovernorates } from '../../../../models/Register/register.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  private authService = inject(AuthService);
  constructor(private router: Router) {}

  user: any = {};
  selectedImage: File | null = null;
  uploadingImage: boolean = false;
  loading = false;
  notvalidemail: string | null = null;
  editingProfile: boolean = false;
  errors = { fullName: '', email: '', phone: '' };
  showPopup = false;
  egyptGovernorates = egyptGovernorates;

  ngOnInit(): void {
    if (!this.authService.hasToken()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadUser();
  }

  loadUser() {
    this.authService.getUserProfile().subscribe({
      next: (res: any) => {
        this.user = res;
      },
      error: (err: any) => {
        console.error('Failed to load user:', err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  validate(): boolean {
    let isValid = true;
    this.errors = { fullName: '', email: '', phone: '' };

    if (!this.user.fullName || this.user.fullName.trim().length < 3) {
      this.errors.fullName = 'Full name must be at least 3 characters.';
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.user.email || !emailPattern.test(this.user.email)) {
      this.errors.email = 'Enter a valid email.';
      isValid = false;
    }

    if (this.user.phone && !/^(010|011|012|015)\d{8}$/.test(this.user.phone)) {
      this.errors.phone = 'Phone must be a valid Egyptian number.';
      isValid = false;
    }

    return isValid;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  uploadImage() {
    if (!this.selectedImage) return;

    const formData = new FormData();
    formData.append('image', this.selectedImage);

    this.uploadingImage = true;
    this.authService.uploadUserProfileImage(formData).subscribe({
      next: (res: { imageUrl: string }) => {
        alert('Image uploaded successfully.');
        this.uploadingImage = false;
        this.loadUser(); // refresh user with new image
      },
      error: (err: any) => {
        console.error('Image upload failed:', err);
        alert('Image upload failed.');
        this.uploadingImage = false;
      }
    });
  }

  startEdit() {
    this.editingProfile = true;
  }

  saveProfile() {
    if (!this.validate()) return;
  
    this.loading = true;
  
    this.authService.updateUser(this.user, this.selectedImage!).subscribe({
      next: () => {
        alert('User updated successfully!');
        this.loading = false;
        this.loadUser();
        this.editingProfile = false;
      },
      error: (err) => {
        console.error('Update failed:', err);
  
        if (err.error?.message === 'Email is already taken.') {
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
