import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryRequestService } from '../../services/delivery-request.service';
import { DeliveryRequestValidators } from '../../../../core/validators/delivery-request-validators';
import { DeliveryRequestCreateDto } from '../../../../models/delivery-request/delivery-request-create.dto';



@Component({
  selector: 'app-delivery-request-creation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './delivery-request-creation.component.html',
  styleUrl: './delivery-request-creation.component.css'
})
export class DeliveryRequestCreationComponent implements OnInit {
  createForm!: FormGroup;

  constructor (
    private fb: FormBuilder,
    private deliveryRequestService: DeliveryRequestService,
    private router: Router
  
  ){ 
    this.initForm();
  }
  ngOnInit(): void {
   
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
          this.router.navigate(['deliveryrequests/getMyDeliveryRequests']);
        },
        error: (error) => {
          console.error('Error creating delivery request:', error);
        }
      });

    }
  }


}
