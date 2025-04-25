import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRequestCreationComponent } from './delivery-request-creation.component';

describe('DeliveryRequestCreationComponent', () => {
  let component: DeliveryRequestCreationComponent;
  let fixture: ComponentFixture<DeliveryRequestCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryRequestCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryRequestCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
