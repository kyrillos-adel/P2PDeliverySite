import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestUpdateDto } from '../../../../models/delivery-request/delivery-request-update.dto';
import { egyptGovernorates } from '../../../../models/Register/register.model';
import { environment } from '../../../../../environments/environment';
import { DeliveryRequestValidators } from '../../../../core/validators/delivery-request-validators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delivery-request-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './delivery-request-update.component.html',
  styleUrl: './delivery-request-update.component.css'
})
export class DeliveryRequestUpdateComponent implements OnInit {

  @Input() requestId!: number;

  updateForm!: FormGroup;
  egyptGovernorates = egyptGovernorates;
  currentImageUrl: string | null = null;
  imageBaseUrl = environment.imageBaseUrl;

  constructor(
    private fb: FormBuilder,
    private deliveryRequestService: DeliveryRequestService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDeliveryRequest(this.requestId);
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
      weight: [0, [Validators.required, Validators.min(0)]],
      DRimage: [null]
    }, {
      validators: [DeliveryRequestValidators.priceRangeValidator('minPrice', 'maxPrice')]
    });
  }
  closeModal(): void {
    // Logic to close the modal
    this.activeModal.close();
    console.log('Modal closed');
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.updateForm.patchValue({ DRimage: file });
    }
  }

  loadDeliveryRequest(id: number): void {
    this.deliveryRequestService.getRequestDetails(id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          const data = response.data;
          this.currentImageUrl = data.drImageUrl;
          this.updateForm.patchValue({
            title: data.title,
            description: data.description,
            pickUpLocation: data.pickUpLocation,
            dropOffLocation: data.dropOffLocation,
            pickUpDate: data.pickUpDate.split('T')[0],
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

  onSubmit() {
    if (this.updateForm.valid) {
      const formValues = this.updateForm.value;

      const data: DeliveryRequestUpdateDto = {
        title: formValues.title,
        description: formValues.description,
        pickUpLocation: formValues.pickUpLocation,
        dropOffLocation: formValues.dropOffLocation,
        pickUpDate: new Date(formValues.pickUpDate),
        minPrice: formValues.minPrice,
        maxPrice: formValues.maxPrice,
        totalWeight: formValues.weight,
        DRimage: formValues.DRimage
      };

      this.deliveryRequestService.update(this.requestId, data).subscribe({
        next: (response) => {
          if (response) {
            this.activeModal.close();
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
