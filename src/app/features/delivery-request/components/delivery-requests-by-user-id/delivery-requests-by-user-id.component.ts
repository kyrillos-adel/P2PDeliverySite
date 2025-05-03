import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestDto } from '../../../../models/delivery-request/delivery-request.dto';
import { AuthService } from '../../../User/Services/Login.auth.service';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryRequestCreationComponent } from '../delivery-request-creation/delivery-request-creation.component';
import { DeliveryRequestUpdateComponent } from '../delivery-request-update/delivery-request-update.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component'; // Adjust the path as needed
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-delivery-requests-by-user-id',
  imports: [CommonModule, RouterModule, ConfirmDialogComponent],
  templateUrl: './delivery-requests-by-user-id.component.html',
  styleUrl: './delivery-requests-by-user-id.component.css'
})
export class DeliveryRequestsByUserIdComponent implements OnInit {
  imageBaseUrl = environment.imageBaseUrl;
  deliveryRequests: DeliveryRequestDto[] = [];
  user: any = {};
  selectedIdToDelete: number | null = null;
  showConfirmModal: boolean = false;

  constructor(
    private deliveryRequestService: DeliveryRequestService,
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe({
      next: (data) => (this.user = data),
      error: (err) => {
        if (err.status === 401) this.router.navigate(['/login']);
      }
    });
    this.loadDeliveryRequests();
  }

  loadDeliveryRequests() {
    this.deliveryRequestService.getMyDeliveryRequests().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.deliveryRequests = response.data.reverse();
        } else {
          console.error('Error fetching delivery requests:', response.message);
        }
      },
      error: (err) => {
        console.error('Request failed:', err);
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
      this.deliveryRequestService.delete(this.selectedIdToDelete).subscribe({
        next: (response) => {
          if (response) {
            this.loadDeliveryRequests();
          }
        },
        error: (err) => console.error(err)
      });
    }
    this.onCancelDelete();
  }
  openUpdateModal(requestId: number) {
    const modalRef = this.modalService.open(DeliveryRequestUpdateComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.componentInstance.requestId = requestId;

    modalRef.closed.subscribe(() => {
      this.loadDeliveryRequests();
    });
  }

  navigateToCreatePost() {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (token) {
      const modalRef = this.modalService.open(DeliveryRequestCreationComponent, {
        centered: true,
        size: 'lg',
        backdrop: 'static'
      });

      modalRef.closed.subscribe(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/deliveryrequests/getMyDeliveryRequests']);
        });
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
