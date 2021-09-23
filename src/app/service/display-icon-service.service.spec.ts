import { TestBed } from '@angular/core/testing';

import { DisplayIconServiceService } from './display-icon-service.service';

describe('DisplayIconServiceService', () => {
  let service: DisplayIconServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayIconServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
