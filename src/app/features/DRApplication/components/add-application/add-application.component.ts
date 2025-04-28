import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DRApplicationService } from '../../services/drapplication.service';
import { FormsModule } from '@angular/forms';
import { AddApplicationDTO } from '../../../../models/DRApplication/add-application-dto';
import { ApiResponse } from '../../../../models/api-response';


@Component({
  selector: 'app-add-application',
  standalone: true,
  imports: [NgbModule,FormsModule ],
  templateUrl: './add-application.component.html',
  styleUrl: './add-application.component.css'
})
export class AddApplicationComponent {
  applicationService = inject(DRApplicationService);
  offeredPrice!: number;
  // data !: AddApplicationDTO;
  @Input() deliveryRequestID!: number;
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(public activeModal: NgbActiveModal,private modalService: NgbModal) {}

  Apply(){
    const Data: AddApplicationDTO = {
      offeredPrice: this.offeredPrice,
      deliveryRequestId: this.deliveryRequestID
    };
    console.log('data:', Data);
    
    this.applicationService.addApplication(Data)
      .subscribe({
        next:(response) =>{
                // console.log(response);
                if (response.isSuccess) {
                  console.log(response);
                  this.activeModal.close();
                } else {
                  var errorMessage = response.message || 'An error occurred while fetching request details.';
                  console.error(errorMessage);
                }
            },
        error: (error) => {
          console.error('An error occurred:', error);
        }
      }
      );

  }
}
