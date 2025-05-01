import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DRApplicationService } from '../../services/drapplication.service';
import { DRApplicationDto } from '../../../../models/DRApplication/DR-Application.dto';

@Component({
  selector: 'app-updateapp',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: './updateapp.component.html',
  styleUrl: './updateapp.component.css'
})
export class UpdateappComponent {
  @Input() selectedAppToEdit!: DRApplicationDto;

  constructor(
    public activeModal: NgbActiveModal,
    private applicationService: DRApplicationService
  ) {}

  onSaveEdit() {
    if (!this.selectedAppToEdit) return;

    this.applicationService.updateApplication(this.selectedAppToEdit.id, this.selectedAppToEdit)
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            console.log('Application updated:', response);
            this.activeModal.close(true); // Signal success to parent
          } else {
            console.error(response.message);
          }
        },
        error: (err) => {
          console.error('Update failed:', err);
        }
      });
  }

  onCancelEdit() {
    this.activeModal.dismiss();
  }
}
