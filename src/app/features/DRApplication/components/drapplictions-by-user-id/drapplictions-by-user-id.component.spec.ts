import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DRApplictionsByUserIdComponent } from './drapplictions-by-user-id.component';

describe('DRApplictionsByUserIdComponent', () => {
  let component: DRApplictionsByUserIdComponent;
  let fixture: ComponentFixture<DRApplictionsByUserIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DRApplictionsByUserIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DRApplictionsByUserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
