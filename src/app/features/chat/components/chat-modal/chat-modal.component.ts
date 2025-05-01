import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignalRService } from '../../services/signal-r.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat-modal',
  imports: [
    FormsModule
  ],
  templateUrl: './chat-modal.component.html',
  styleUrl: './chat-modal.component.css'
})
export class ChatModalComponent {
  @Input() applicantId!: number;
  @Input() deliveryRequestId!: string;
  message: string = '';

  private signalRService = inject(SignalRService);
  activeModal = inject(NgbActiveModal);

  sendMessage() {
    if (this.message.trim()) {
      this.signalRService.startNewChat(this.deliveryRequestId, this.message, this.applicantId);
      this.activeModal.close();
    }
  }
}
