import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestDto } from '../../../../models/delivery-request/delivery-request.dto';
import { AuthService } from '../../../User/Services/Login.auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-delivery-requests-by-user-id',
  imports: [CommonModule, RouterModule],
  templateUrl: './delivery-requests-by-user-id.component.html',
  styleUrl: './delivery-requests-by-user-id.component.css'
})
export class DeliveryRequestsByUserIdComponent implements OnInit {
  deliveryRequests: DeliveryRequestDto[] = [];

  constructor(private deliveryRequestService: DeliveryRequestService
, private authService: AuthService
  ) {}

  ngOnInit() {
    this.deliveryRequestService.getMyDeliveryRequests().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.deliveryRequests = response.data;
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
}
