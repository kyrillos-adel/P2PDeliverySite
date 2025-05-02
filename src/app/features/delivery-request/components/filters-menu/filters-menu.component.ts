import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';

declare var bootstrap: any;

@Component({
  selector: 'app-filters-menu',
  imports: [FormsModule],
  templateUrl: './filters-menu.component.html',
  styleUrl: './filters-menu.component.css'
})
export class FiltersMenuComponent implements AfterViewInit {
  constructor(private filterService: FilterService) {}
  statusMap: { [key: string]: number } = {
    'Pending': 0,
    'Accepted': 1,
    'Completed': 2,
    'Cancelled': 3,
    'Delivered': 4
  };
  
  titleFilter: string = '';
  statusFilter: number[]=[];
  pickupLocation: string = '';
  dropoffLocation: string = '';
  pickupDate: string = '';
  minPrice: number | null = null;

  applyFilters() {
    const filters = {
      title: this.titleFilter,
      status: this.statusFilter,
      pickupLocation: this.pickupLocation,
      dropoffLocation: this.dropoffLocation,
      pickupDate: this.pickupDate,
      minPrice: this.minPrice
    };

    this.filterService.updateFilters(filters);
    console.log(filters);
    if (this.offcanvasInstance) {
      this.offcanvasInstance.hide();
    }
  }


  updateStatusFilter(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = parseInt(checkbox.value, 10);
  
    if (checkbox.checked) {
      this.statusFilter.push(value);
    } else {
      this.statusFilter = this.statusFilter.filter(v => v !== value);
    }
  }

  @ViewChild('offcanvasElement') offcanvasElement!: ElementRef;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  private offcanvasInstance: any;

  ngAfterViewInit(): void {
    if (this.offcanvasElement?.nativeElement) {
      this.offcanvasInstance = new bootstrap.Offcanvas(this.offcanvasElement.nativeElement);

      this.offcanvasElement.nativeElement.addEventListener('hidden.bs.offcanvas', () => {
        this.forceCleanup(); 
      });
    }
  }

  private forceCleanup(): void {
    if (this.closeBtn?.nativeElement) {
      this.closeBtn.nativeElement.click();
    }
  }
}
