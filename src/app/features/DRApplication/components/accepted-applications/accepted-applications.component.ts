import { Component } from '@angular/core';
import { DRApplicationDto } from '../../../../models/DRApplication/DR-Application.dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DRApplicationService } from '../../services/drapplication.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accepted-applications',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './accepted-applications.component.html',
  styleUrl: './accepted-applications.component.css'
})
export class AcceptedApplicationsComponent {
  Applications: DRApplicationDto[] = [];

  constructor( private drApplicationService: DRApplicationService ) {}
    
  ngOnInit() {
    this.loadApplications();
  }
    
  loadApplications() {
    this.drApplicationService.getMyApplications().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          console.log(response);
          this.Applications = response.data.filter(x=>x.applicationStatus=="Accepted");
        } else {
          console.error('Error fetching DR Applications', response.message);
        }
      },
      error: (err) => {
        console.error('Request Failed:', err);
      }
    });
  }
    
  // confirmDelete(id: number) {
  //   this.selectedIdToDelete = id;
  //   this.showConfirmModal = true;
  // }

  // onCancelDelete() {
  //   this.selectedIdToDelete = null;
  //   this.showConfirmModal = false;
  // }
    
  // onConfirmDelete() {
  //   if (this.selectedIdToDelete !== null) {
  //     this.drApplicationService.deleteApplication(this.selectedIdToDelete).subscribe({
  //       next: (response) => {
  //         if (response.isSuccess) {
  //           this.loadApplications();
  //         }
  //       },
  //       error: (err) => console.error(err)
  //     });
  //   }
  //   this.onCancelDelete();
  // }
    
  // confirmUpdate(app: DRApplicationDto) {
  //   this.selectedAppToUpdate = { ...app };
  //   this.updatedOfferedPrice = app.offeredPrice;
  //   this.showUpdateModal = true;
  // }

  // onCancelUpdate() {
  //   this.selectedAppToUpdate = null;
  //   this.updatedOfferedPrice = null;
  //   this.showUpdateModal = false;
  // }

  // onConfirmUpdate(newPrice: number) {
  //   if (this.selectedAppToUpdate) {
  //     const updatedApp: DRApplicationDto = {
  //       ...this.selectedAppToUpdate,
  //       offeredPrice: newPrice
  //     };
  
  //     this.drApplicationService.updateApplication(this.selectedAppToUpdate.id, updatedApp).subscribe({
  //       next: (response) => {
  //         if (response.isSuccess) {
  //           this.loadApplications();
  //         }
  //       },
  //       error: (err) => console.error('Update failed:', err)
  //     });
  //   }
  
  //   this.onCancelUpdate();
  // }
      
}
