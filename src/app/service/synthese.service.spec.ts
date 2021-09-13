import { TestBed } from '@angular/core/testing';

import { SyntheseService } from './synthese.service';

describe('SyntheseService', () => {
  let service: SyntheseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyntheseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
