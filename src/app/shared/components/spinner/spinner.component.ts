import { Component } from '@angular/core';
import { SpinnerService } from '../../../core/services/spinner.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [NgIf],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  isLoading = false;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.loading$.subscribe(value => {
      this.isLoading = value;
    });
  }
}
