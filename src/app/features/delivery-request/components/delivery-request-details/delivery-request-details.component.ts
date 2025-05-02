import { Component, inject } from '@angular/core';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestDetails} from '../../../../models/delivery-request/delivery-request-details';

import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule,Router } from '@angular/router';
import { AddApplicationComponent } from '../../../DRApplication/components/add-application/add-application.component';

import {ChatModalComponent} from '../../../chat/components/chat-modal/chat-modal.component';

@Component({
  selector: 'app-delivery-request-details',
  standalone: true,
  imports: [NgIf,RouterModule, CommonModule,
    FormsModule ],
  templateUrl:'./delivery-request-details.component.html',
  styleUrl: './delivery-request-details.component.css'
})
export class DeliveryRequestDetailsComponent {

  deliveryRequestService = inject(DeliveryRequestService);
  route = inject(ActivatedRoute);
  applicationService = inject(DeliveryRequestService);
  deliveryRequestDetails !: DeliveryRequestDetails;
  errorMessage: string = '';
  router = inject(Router);
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


  openPopup(deliveryRequestId: number) {
    
     const token = localStorage.getItem('token') || sessionStorage.getItem('token'); 

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

  openChatModal(applicantId: number, deliveryRequestId: number) {
    const modalRef = this.modalService.open(ChatModalComponent);
    modalRef.componentInstance.applicantId = applicantId;
    modalRef.componentInstance.deliveryRequestId = deliveryRequestId;
  }
  updateApplicationStatus(appId: number, selectedStatus: string) {
    if (!selectedStatus) {
      alert("Please select a status");
      return;
    }
  
    this.applicationService.changeStatus(appId, selectedStatus).subscribe({
      next: (response) => {
        if (response.isSuccess) {
        
         
          this.deliveryRequestService.getRequestDetails(this.deliveryRequestDetails.id).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.deliveryRequestDetails = response.data;
              } else {
                console.error('Error fetching updated delivery request details', response.message);
              }
            },
            error: (err) => {
              console.error('Request Failed:', err);
            }
          });
        } else {
          alert("Failed to update status.");
        }
      },
      error: () => {
        alert("Error occurred while updating status.");
      }
    });
  }
  trackApp(index: number, app: any): any {
    return app.id; 
  }
  
}
