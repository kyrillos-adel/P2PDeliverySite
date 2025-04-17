import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRequestDetailsComponent } from './delivery-request-details.component';

describe('DeliveryRequestDetailsComponent', () => {
  let component: DeliveryRequestDetailsComponent;
  let fixture: ComponentFixture<DeliveryRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryRequestDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
