import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestDto } from '../../../../models/delivery-request/delivery-request.dto';
import { RouterModule,Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddApplicationComponent } from '../../../DRApplication/components/add-application/add-application.component';

@Component({
  selector: 'app-delivery-requests-retrive',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delivery-requests-retrive.component.html',
  styleUrls: ['./delivery-requests-retrive.component.css']
})
export class DeliveryRequestsRetriveComponent implements OnInit {
  deliveryRequests: DeliveryRequestDto[] = [];

  deliveryRequestService = inject(DeliveryRequestService);
  modalService = inject(NgbModal); 
  router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.deliveryRequestService.getallDRs().subscribe(response => {
      if (response.isSuccess) {
        this.deliveryRequests = response.data;
      } else {
        console.error('Error fetching delivery requests:', response.message);
      }
    });
  }

  openPopup(deliveryRequestId: number) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token'); // ✅ Check token

    if (token) {
     
      const modalRef = this.modalService.open(AddApplicationComponent, {
        centered: true,
        size: 'm'
      });

      modalRef.componentInstance.deliveryRequestID = deliveryRequestId;
    } else {
      
      this.router.navigate(['/login']);
    }
  }
}
