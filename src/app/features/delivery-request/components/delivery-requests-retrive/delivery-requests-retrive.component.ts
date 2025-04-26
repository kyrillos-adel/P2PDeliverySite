import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestDto } from '../../../../models/delivery-request/delivery-request.dto';


@Component({
  selector: 'app-delivery-requests-retrive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-requests-retrive.component.html',
  styleUrls: ['./delivery-requests-retrive.component.css']
})
export class DeliveryRequestsRetriveComponent implements OnInit {
  deliveryRequests: DeliveryRequestDto[] = [];

  constructor(private deliveryRequestService: DeliveryRequestService) {}

  ngOnInit() {
    this.deliveryRequestService.getallDRs().subscribe(response => {
      if (response.isSuccess) {
        this.deliveryRequests = response.data;
      } else {
        console.error('Error fetching delivery requests:', response.message);
      }
    });


    
  }


  
}






// getUser(name: string): Observable<any> {
//   const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//   if (!token) {
//     console.error('No token found');
//     return throwError(() => new Error('No token'));
//   }
//   const headers = new HttpHeaders({
//     'Authorization': Bearer ${token},
//   });
//   const params = new HttpParams().set('Name', name);
//   return this.http.get(${this.apiUrl}/findbyname, { headers , params }); 
// } 
// getToken(): string | null {
//   return localStorage.getItem('token') || sessionStorage.getItem('token');
// }
