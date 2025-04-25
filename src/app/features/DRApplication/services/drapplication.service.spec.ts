import { TestBed } from '@angular/core/testing';

import { DRApplicationService } from './drapplication.service';

describe('DRApplicationService', () => {
  let service: DRApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DRApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
