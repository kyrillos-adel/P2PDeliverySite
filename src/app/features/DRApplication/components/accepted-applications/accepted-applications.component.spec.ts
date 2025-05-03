import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedApplicationsComponent } from './accepted-applications.component';

describe('AcceptedApplicationsComponent', () => {
  let component: AcceptedApplicationsComponent;
  let fixture: ComponentFixture<AcceptedApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptedApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
