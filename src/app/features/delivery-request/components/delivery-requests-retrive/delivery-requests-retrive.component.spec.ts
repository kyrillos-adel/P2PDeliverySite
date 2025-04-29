import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRequestsRetriveComponent } from './delivery-requests-retrive.component';

describe('DeliveryRequestsRetriveComponent', () => {
  let component: DeliveryRequestsRetriveComponent;
  let fixture: ComponentFixture<DeliveryRequestsRetriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryRequestsRetriveComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryRequestsRetriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
