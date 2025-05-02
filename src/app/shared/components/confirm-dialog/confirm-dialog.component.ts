import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    CommonModule,
    FormsModule
  ],
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent implements OnChanges {
  @Input() title: string = 'Confirm';
  @Input() message: string = '';
  @Input() confirmText: string = 'Yes';
  @Input() cancelText: string = 'Cancel';
  @Input() showPriceInput: boolean = false;

  @Input() updatedOfferedPrice: number | null = null; // comes from parent
  @Output() confirm = new EventEmitter<number>(); // emit updated value
  @Output() cancel = new EventEmitter<void>();

  updatedValue: number | null = null;
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['updatedOfferedPrice']) {
      this.updatedValue = this.updatedOfferedPrice;
    }
  }

  onConfirm() {
    this.confirm.emit(this.updatedValue!); // send back new price
  }

  onCancel() {
    this.cancel.emit();
  }
}
