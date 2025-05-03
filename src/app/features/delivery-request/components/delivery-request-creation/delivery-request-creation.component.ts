import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestValidators } from '../../../../core/validators/delivery-request-validators';
import { DeliveryRequestCreateDto } from '../../../../models/delivery-request/delivery-request-create.dto';
import { CommonModule } from '@angular/common';
import { egyptGovernorates } from '../../../../models/Register/register.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delivery-request-creation',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './delivery-request-creation.component.html',
  styleUrl: './delivery-request-creation.component.css'
})
export class DeliveryRequestCreationComponent implements OnInit {
  createForm!: FormGroup;
  egyptGovernorates = egyptGovernorates;
  minDate: string = '';

  constructor (
    private fb: FormBuilder,
    private deliveryRequestService: DeliveryRequestService,
    private router: Router,
    private activeModal: NgbActiveModal
  
  ){ 
    this.initForm();
  }
  ngOnInit(): void {
    const today = new Date();
  this.minDate = today.toISOString().split('T')[0];
  }

  initForm(): void {
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      totalWeight:['',[Validators.required]],
      pickUpLocation: ['', [Validators.required]],
      dropOffLocation: ['', [Validators.required]],
      pickUpDate: ['', [Validators.required]],
      minPrice: [0, [Validators.required, Validators.min(0)]],
      maxPrice: [0, [Validators.required, Validators.min(0)]],
    }, { validators: [DeliveryRequestValidators.priceRangeValidator('minPrice', 'maxPrice')] });
  }
  onSubmit(): void {
    
    if(this.createForm.valid)
    {
      console.log(this.createForm.value);

      const data= this.createForm.value;

      console.log(this.createForm.value);
      this.deliveryRequestService.create(data).subscribe
      
({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error('Error creating delivery request:', error);
        }
      });
      this.closeModal();

    }

  }
  closeModal(): void {
    this.activeModal.close(); 
  }


}