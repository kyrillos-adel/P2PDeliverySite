import {Component, OnInit} from '@angular/core';
import {DeliveryRequestService} from '../../services/delivery-request.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DeliveryRequestValidators} from '../../../../core/validators/delivery-request-validators';
import {DeliveryRequestUpdateDto} from '../../../../models/delivery-request/delivery-request-update.dto';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-delivery-request-update',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './delivery-request-update.component.html',
  styleUrl: './delivery-request-update.component.css'
})
export class DeliveryRequestUpdateComponent implements OnInit {

  updateForm!: FormGroup;
  deliveryRequestId!: number;

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
      }, { validators: [DeliveryRequestValidators.priceRangeValidator('minPrice', 'maxPrice')] }
    );
  }

  loadDeliveryRequest(): void {
    this.deliveryRequestService.getById(this.deliveryRequestId).subscribe({
      next: (data) => {
        this.updateForm.patchValue({
          title: data.title,
          description: data.description,
          pickUpLocation: data.pickUpLocation,
          dropOffLocation: data.dropOffLocation,
          pickUpDate: data.pickUpDate,
          minPrice: data.minPrice,
          maxPrice: data.maxPrice
        });
      }
    });
  }

  onSubmit(){
    if(this.updateForm.valid){
      const data: DeliveryRequestUpdateDto = {
        title: this.updateForm.value.title,
        description: this.updateForm.value.description,
        totalWeight: 0, // Assuming totalWeight is not needed for update
        pickUpLocation: this.updateForm.value.pickUpLocation,
        dropOffLocation: this.updateForm.value.dropOffLocation,
        pickUpDate: new Date(this.updateForm.value.pickUpDate),
        minPrice: this.updateForm.value.minPrice,
        maxPrice: this.updateForm.value.maxPrice
      }

      this.deliveryRequestService.update(this.deliveryRequestId, data).subscribe({
        next: () => {
          this.router.navigate(['/deliveryrequest']);
        },
        error: (error) => {
          console.error('Error updating delivery request:', error);
        }
      });
    }
  }
}
