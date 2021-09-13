import { TestBed } from '@angular/core/testing';

import { DisplayConfigurationService } from './display-configuration.service';

describe('DisplayConfigurationService', () => {
  let service: DisplayConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
