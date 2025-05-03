import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingProgressComponent } from './tracking-progress.component';

describe('TrackingProgressComponent', () => {
  let component: TrackingProgressComponent;
  let fixture: ComponentFixture<TrackingProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
