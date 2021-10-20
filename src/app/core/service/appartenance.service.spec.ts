import { TestBed } from '@angular/core/testing';

import { AppartenanceService } from './appartenance.service';

describe('AppartenanceService', () => {
  let service: AppartenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppartenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
