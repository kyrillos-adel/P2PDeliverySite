import { Component, inject } from '@angular/core';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestDetails } from '../../../../models/delivery-request/delivery-request-details';
import { ApiResponse } from '../../../../models/api-response';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-delivery-request-details',
  imports: [NgIf],
  templateUrl: './delivery-request-details.component.html',
  styleUrl: './delivery-request-details.component.css'
})
export class DeliveryRequestDetailsComponent {

  deliveryRequestService = inject(DeliveryRequestService);
  route = inject(ActivatedRoute);
  deliveryRequestDetails !: DeliveryRequestDetails; // You can strongly type it if you have an interface
  errorMessage: string = '';

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id')); // gets ID from URL
    if (!id) {
      this.errorMessage = 'Invalid request ID';
      return;
    }

    this.deliveryRequestService
    .getRequestDetails(id)
    .subscribe((response:ApiResponse<DeliveryRequestDetails>)=> {
      console.log(response);
      if (response.isSuccess) {
        this.deliveryRequestDetails = response.data;
        console.log(this.deliveryRequestDetails);
      } else {
        this.errorMessage = response.message || 'An error occurred while fetching request details.';
        console.error(this.errorMessage);
      }
    });

  }


}
