import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DRApplicationDto } from '../../../../models/DRApplication/DR-Application.dto';
import { AuthService } from '../../../User/Services/Login.auth.service';
import { DRApplicationService } from '../../services/drapplication.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmDialogComponent],
  templateUrl: './drapplictions-by-user-id.component.html',
  styleUrl: './drapplictions-by-user-id.component.css'
})

  export class DRApplictionsByUserIdComponent implements OnInit {
    DrApplications: DRApplicationDto[] = [];
    SortedDrApplications: DRApplicationDto[] = [];
    selectedIdToDelete: number | null = null;
    showConfirmModal = false;
    showUpdateModal = false;
  
    selectedAppToUpdate: DRApplicationDto | null = null;
    updatedOfferedPrice: number | null = null;
  
    constructor(
      private drApplicationService: DRApplicationService,
      private authService: AuthService
    ) {}
  
    ngOnInit() {
      this.loadApplications();
    }
  
    
  loadApplications(): void {
    this.drApplicationService.getMyApplications().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.DrApplications = response.data;
          this.sortApplications();
        } else {
          console.error('Error fetching DR Applications', response.message);
        }
      },
      error: (err) => {
        console.error('Request Failed:', err);
      }
    });
  }

  private sortApplications(): void {
    this.SortedDrApplications = [...this.DrApplications].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }
  
    confirmDelete(id: number) {
      this.selectedIdToDelete = id;
      this.showConfirmModal = true;
    }
  
    onCancelDelete() {
      this.selectedIdToDelete = null;
      this.showConfirmModal = false;
    }
  
    onConfirmDelete() {
      if (this.selectedIdToDelete !== null) {
        this.drApplicationService.deleteApplication(this.selectedIdToDelete).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.loadApplications();
            }
          },
          error: (err) => console.error(err)
        });
      }
      this.onCancelDelete();
    }
  
    confirmUpdate(app: DRApplicationDto) {
      this.selectedAppToUpdate = { ...app };
      this.updatedOfferedPrice = app.offeredPrice;
      this.showUpdateModal = true;
    }
  
    onCancelUpdate() {
      this.selectedAppToUpdate = null;
      this.updatedOfferedPrice = null;
      this.showUpdateModal = false;
    }
  
    onConfirmUpdate(newPrice: number) {
      if (this.selectedAppToUpdate) {
        const updatedApp: DRApplicationDto = {
          ...this.selectedAppToUpdate,
          offeredPrice: newPrice
        };
    
        this.drApplicationService.updateApplication(this.selectedAppToUpdate.id, updatedApp).subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.loadApplications();
            }
          },
          error: (err) => console.error('Update failed:', err)
        });
      }
    
      this.onCancelUpdate();
    }
    
    
  }
