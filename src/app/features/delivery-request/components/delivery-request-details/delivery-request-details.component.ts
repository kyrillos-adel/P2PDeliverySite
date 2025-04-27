import { Component, inject } from '@angular/core';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestDetails } from '../../../../models/delivery-request/delivery-request-details';
import { ApiResponse } from '../../../../models/api-response';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddApplicationComponent } from '../../../DRApplication/components/add-application/add-application.component';


@Component({
  selector: 'app-delivery-request-details',
  imports: [NgIf],
  templateUrl: './delivery-request-details.component.html',
  styleUrl: './delivery-request-details.component.css'
})
export class DeliveryRequestDetailsComponent {

  deliveryRequestService = inject(DeliveryRequestService);
  route = inject(ActivatedRoute);
  deliveryRequestDetails !: DeliveryRequestDetails; 
  errorMessage: string = '';
  constructor(private modalService: NgbModal) {}

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id')); // gets ID from URL
    if (!id) {
      this.errorMessage = 'Invalid request ID';
      return;
    }

    this.deliveryRequestService
    .getRequestDetails(id)
    .subscribe({
      next: (response)=> {
      console.log(response);
      if (response.isSuccess) {
        this.deliveryRequestDetails = response.data;
        console.log(this.deliveryRequestDetails);
      } else {
        this.errorMessage = response.message || 'An error occurred while fetching request details.';
        console.error(this.errorMessage);
      }
    }});

  }


  openPopup() {
    const modalRef = this.modalService.open(AddApplicationComponent, {
      centered: true, 
      size: 'm'
    });

    modalRef.componentInstance.deliveryRequestID = this.deliveryRequestDetails.id;
  }
}
