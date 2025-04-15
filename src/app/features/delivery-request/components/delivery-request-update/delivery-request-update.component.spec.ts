import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRequestUpdateComponent } from './delivery-request-update.component';

describe('DeliveryRequestUpdateComponent', () => {
  let component: DeliveryRequestUpdateComponent;
  let fixture: ComponentFixture<DeliveryRequestUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryRequestUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryRequestUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
