import { NgClass, NgSwitch } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TrackingService } from '../../services/tracking.service';
import { AddTrackDTO } from '../../../../models/Tracking/add-track-dto';
import { TrackingDTO } from '../../../../models/Tracking/tracking-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracking-progress',
  imports: [NgSwitch, NgClass],
  templateUrl: './tracking-progress.component.html',
  styleUrl: './tracking-progress.component.css'
})
export class TrackingProgressComponent {
  trackingService = inject(TrackingService);
  route = inject(ActivatedRoute);

  actualStep:number = 0;
  currentStep: number = 0;
  offerPrice: number = 80; // value from request
  IsAccepted: boolean = false;
  actualTrack !: TrackingDTO;
  deliveryRequestID !: number; 

  constructor(){
    this.deliveryRequestID = Number(this.route.snapshot.paramMap.get('id')); 
    console.log("ID is:", this.deliveryRequestID);
  }

  ngOnInit(){
    this.trackingService.getLast(this.deliveryRequestID).subscribe({
      next: (response)=> {
      // console.log(response);
      if (response.isSuccess) {
        console.log(response);
        this.actualTrack = response.data;
        if(response.data){
          this.actualStep = response.data.status;
          this.currentStep=this.actualStep+1;
        }
        else{
          this.actualStep = -1;
          this.currentStep=this.actualStep+1;
        }
        if(this.actualStep>0){
          this.IsAccepted = true; 
        }

        console.log("Current step", this.currentStep);
      } else {
        console.error('An error occurred while fetching request details.');
      }
    }});
  }

advanceStep(): void {
  if (this.actualStep < 3) {
    this.actualStep++;
    this.currentStep = this.actualStep+1;
    var trackdto : AddTrackDTO ={
      status : this.actualStep,
      userId : this.actualTrack?.userId,
      deliveryRequestId: this.deliveryRequestID
    }

    this.trackingService.addUpdate(trackdto).subscribe({
        next: (response)=> {
        console.log(response);
        if (response.isSuccess) {
        console.log(response);
        } else {
          console.error('An error occurred while fetching request details.');
        }
      }}
    )
  }
}
Reject(){
  // send update to backend => reject the request
}

  steps = [
    {
      label: 'Order Placed',
      description: 'The delivery request has been created and is awaiting traveler acceptance.'
    },
    {
      label: 'Traveler Accepted',
      description: 'A traveler accepted the delivery and is preparing to pick up the item.'
    },
    {
      label: 'In Transit',
      description: 'The item is on the way to the destination.'
    },
    {
      label: 'Delivered',
      description: 'The item has been successfully delivered to the recipient.'
    }
  ];

  selectStep(index: number): void {
    if(this.actualStep>=index){
      this.currentStep = index;
    }
  }
}
