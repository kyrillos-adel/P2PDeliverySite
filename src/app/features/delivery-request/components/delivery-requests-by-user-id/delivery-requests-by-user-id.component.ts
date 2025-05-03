import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestDto } from '../../../../models/delivery-request/delivery-request.dto';
import { AuthService } from '../../../User/Services/Login.auth.service';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeliveryRequestCreationComponent } from '../delivery-request-creation/delivery-request-creation.component';
@Component({
  selector: 'app-delivery-requests-by-user-id',
  imports: [CommonModule, RouterModule],
  templateUrl: './delivery-requests-by-user-id.component.html',
  styleUrl: './delivery-requests-by-user-id.component.css'
})
export class DeliveryRequestsByUserIdComponent implements OnInit {
  deliveryRequests: DeliveryRequestDto[] = [];
  user: any = {};

  constructor(private deliveryRequestService: DeliveryRequestService
, private authService: AuthService,
private modalService: NgbModal,
private router: Router,
  ) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe({
      next: (data) => this.user = data,
      error: (err) => {
        if (err.status === 401) this.router.navigate(['/login']);
      }
    });
   this.loadDeliveryRequests();
  }
  loadDeliveryRequests() 
  {
    this.deliveryRequestService.getMyDeliveryRequests().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.deliveryRequests = response.data.reverse();
          console.log(this.deliveryRequests);
        } else {
          console.error('Error fetching delivery requests:', response.message);
        }
      },
      error: (err) => {
        console.error('Request failed:', err);
      }
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

