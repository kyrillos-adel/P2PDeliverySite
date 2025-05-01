import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateappComponent } from './updateapp.component';

describe('UpdateappComponent', () => {
  let component: UpdateappComponent;
  let fixture: ComponentFixture<UpdateappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateappComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
