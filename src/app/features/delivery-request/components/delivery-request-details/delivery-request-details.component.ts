import { Component, inject } from '@angular/core';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestDetails} from '../../../../models/delivery-request/delivery-request-details';
import{ApplicationstatusDTO} from '../../../../models/delivery-request/delivery-request-details';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule,Router } from '@angular/router';
import { AddApplicationComponent } from '../../../DRApplication/components/add-application/add-application.component';

import {ChatModalComponent} from '../../../chat/components/chat-modal/chat-modal.component';
import { TrackingProgressComponent } from "../tracking-progress/tracking-progress.component";

@Component({
  selector: 'app-delivery-request-details',
  standalone: true,
  imports: [NgIf, RouterModule, CommonModule,
    FormsModule, TrackingProgressComponent],
  templateUrl:'./delivery-request-details.component.html',
  styleUrl: './delivery-request-details.component.css'
})
export class DeliveryRequestDetailsComponent {

  deliveryRequestService = inject(DeliveryRequestService);
  route = inject(ActivatedRoute);
  applicationService = inject(DeliveryRequestService);
  deliveryRequestDetails !: DeliveryRequestDetails;
  ApplicationstatusDTO !: ApplicationstatusDTO;
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
        this.deliveryRequestDetails.pickUpDate = response.data.pickUpDate.split('T')[0];
        this.deliveryRequestDetails.applicationDTOs.forEach(app => {
          if (app.date) {
            app.date = app.date.split('T')[0];
          }
        })
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
  updateApplicationStatus(
    id: number,
    status: number,
  ): void {
    const inp: ApplicationstatusDTO = {
      id: id,
      status: status,
      deleveryRequestId: this.deliveryRequestDetails.id
    };
    console.log(inp);
    this.applicationService.changeStatus(inp).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          //refresh the page or update the UI as needed
          this.deliveryRequestService.getRequestDetails(this.deliveryRequestDetails.id).subscribe((response) => { 
            if (response.isSuccess) {
              this.deliveryRequestDetails = response.data;
            } else {
              this.errorMessage = 'Failed to refresh request details.';
            }
          }
          );
          
        } else {
          this.errorMessage = 'Failed to update status.';
        }
      },
      error: (err) => {
        this.errorMessage = 'An error occurred while updating the status.';
        console.error(this.errorMessage);
      }
    });
  }
  hasAcceptedApplication(): boolean {
    return this.deliveryRequestDetails.applicationDTOs?.some(app => app.applicationStatus === 'Accepted') || false;
  }
  get nonRejectedApplications() {
    return this.deliveryRequestDetails?.applicationDTOs?.filter(app => app.applicationStatus !== 'Rejected');
  }
  
  trackApp(index: number, app: any): any {
    return app.id; 
  }
  
}
