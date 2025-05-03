import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestDto } from '../../../../models/delivery-request/delivery-request.dto';
import { RouterModule,Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddApplicationComponent } from '../../../DRApplication/components/add-application/add-application.component';
import { FiltersMenuComponent } from "../filters-menu/filters-menu.component";
import { FilterService } from '../../services/filter.service';
import { AuthService } from '../../../User/Services/Login.auth.service';
import { DeliveryRequestCreationComponent } from '../delivery-request-creation/delivery-request-creation.component';
@Component({
  selector: 'app-delivery-requests-retrive',
  standalone: true,
  imports: [CommonModule, RouterModule, FiltersMenuComponent],
  templateUrl: './delivery-requests-retrive.component.html',
  styleUrls: ['./delivery-requests-retrive.component.css']
})
export class DeliveryRequestsRetriveComponent implements OnInit {
  deliveryRequests: DeliveryRequestDto[] = [];
  totalItems = 100;
  currentPage = 1;
  pageSize = 5;
  totalPages=1;

  user: any = {};
  deliveryRequestService = inject(DeliveryRequestService);
  modalService = inject(NgbModal); 
  router = inject(Router);

  constructor(private filterService: FilterService,private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Failed to load user:', err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
    this.loadData();
  }

  loadData(){
    let filters = {
      title: null,
      status: null,
      pickupLocation: null,
      dropoffLocation: null,
      pickupDate: null,
      minPrice: null,
      PageNumber:this.currentPage
    };
    this.filterService.filters$.subscribe(filter => {
      console.log('Received filters:', filter);
      filters=filter;
      this.deliveryRequestService.getallDRs(filters,this.currentPage).subscribe(response => {
        if (response.isSuccess) {
          this.deliveryRequests = response.data.data.reverse();
          this.currentPage = response.data.currentPage;
          this.totalItems = response.data.totalCount;
          this.pageSize = response.data.pageSize;
          this.totalPages = response.data.totalPages;
        } else {
          console.error('Error fetching delivery requests:', response.message);
        }
      });
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return !!token;
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
          this.router.navigate(['/deliveryrequests/getallDRs']);
        });
      });

    } else {
      this.router.navigate(['/login']);
    }
  }
}
