import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRequestsByUserIdComponent } from './delivery-requests-by-user-id.component';

describe('DeliveryRequestsByUserIdComponent', () => {
  let component: DeliveryRequestsByUserIdComponent;
  let fixture: ComponentFixture<DeliveryRequestsByUserIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryRequestsByUserIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryRequestsByUserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
