import {Component, OnInit} from '@angular/core';
import {DeliveryRequestService} from '../../services/delivery-request.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DeliveryRequestValidators} from '../../../../core/validators/delivery-request-validators';
import {DeliveryRequestUpdateDto} from '../../../../models/delivery-request/delivery-request-update.dto';
import {ActivatedRoute, Router} from '@angular/router';
import { egyptGovernorates } from '../../../../models/Register/register.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-delivery-request-update',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './delivery-request-update.component.html',
  styleUrl: './delivery-request-update.component.css'
})
export class DeliveryRequestUpdateComponent implements OnInit {

  updateForm!: FormGroup;
  deliveryRequestId!: number;
  egyptGovernorates = egyptGovernorates;

  constructor(
    private deliveryRequestService: DeliveryRequestService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.deliveryRequestId = this.route.snapshot.params['id'];
    this.initForm();
    this.loadDeliveryRequest()
  }

  initForm(): void {
    this.updateForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      pickUpLocation: ['', [Validators.required]],
      dropOffLocation: ['', [Validators.required]],
      pickUpDate: ['', [Validators.required]],
      minPrice: [0, [Validators.required, Validators.min(0)]],
      maxPrice: [0, [Validators.required, Validators.min(0)]],
      weight: [0, [Validators.required, Validators.min(0)]]
      }, { validators: [DeliveryRequestValidators.priceRangeValidator('minPrice', 'maxPrice')] }
    );
  }
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.updateForm.patchValue({ DRimage: file });
    }
  }
  

  loadDeliveryRequest(): void {
    this.deliveryRequestService.getRequestDetails(this.deliveryRequestId).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          const data = response.data;
          this.updateForm.patchValue({
            title: data.title,
            description: data.description,
            pickUpLocation: data.pickUpLocation,
            dropOffLocation: data.dropOffLocation,
            pickUpDate: data.pickUpDate.split('T')[0], // Format date for input[type="date"]
            minPrice: data.minPrice,
            maxPrice: data.maxPrice,
            weight: data.totalWeight
          });
        } else {
          console.error('Error loading delivery request:', response.message);
        }
      },
      error: (err) => {
        console.error('Failed to load delivery request:', err);
      }
    });
  }

  onSubmit(){
    if(this.updateForm.valid){
      const data: DeliveryRequestUpdateDto = {
        title: this.updateForm.value.title,
        description: this.updateForm.value.description,
        pickUpLocation: this.updateForm.value.pickUpLocation,
        dropOffLocation: this.updateForm.value.dropOffLocation,
        pickUpDate: new Date(this.updateForm.value.pickUpDate),
        minPrice: this.updateForm.value.minPrice,
        maxPrice: this.updateForm.value.maxPrice,
        totalWeight: this.updateForm.value.weight
      }

      this.deliveryRequestService.update(this.deliveryRequestId, data).subscribe({
        next: (response) => {
          if (response) {
            this.router.navigate(['/deliveryrequests/getMyDeliveryRequests']);
          } else {
            console.error('Update failed:', response);
          }
        },
        error: (err) => {
          console.error('Failed to update delivery request:', err);
        }
      });
    }
  }
}
