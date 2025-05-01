import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DRApplicationDto } from '../../../../models/DRApplication/DR-Application.dto';
import { AuthService } from '../../../User/Services/Login.auth.service';
import { DRApplicationService } from '../../services/drapplication.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateappComponent } from '../updateapp/updateapp.component'; // Adjust the path if needed

@Component({
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent],
  templateUrl: './drapplictions-by-user-id.component.html',
  styleUrl: './drapplictions-by-user-id.component.css'
})
export class DRApplictionsByUserIdComponent implements OnInit {
  DrApplications: DRApplicationDto[] = [];
  selectedIdToDelete: number | null = null;
  showConfirmModal = false;

  constructor(
    private drApplicationService: DRApplicationService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.drApplicationService.getMyApplications().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.DrApplications = response.data;
          console.log(this.DrApplications);
        } else {
          console.error('Error fetching DR Applications', response.message);
        }
      },
      error: (err) => {
        console.error('Request Failed:', err);
      }
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
      this.drApplicationService.deleteApplication(this.selectedIdToDelete)
        .subscribe({
          next: (response) => {
            if (response.isSuccess) {
              this.loadApplications(); // reload list
            }
          },
          error: (err) => console.error(err)
        });
    }
    this.onCancelDelete();
  }

  openUpdateModal(app: DRApplicationDto) {
    const modalRef = this.modalService.open(UpdateappComponent, { centered: true });
    modalRef.componentInstance.selectedAppToEdit = app;

    modalRef.closed.subscribe(result => {
      if (result) {
        this.loadApplications(); // refresh list after update
      }
    });
  }
}
