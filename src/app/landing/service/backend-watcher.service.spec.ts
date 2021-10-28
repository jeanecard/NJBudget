import { TestBed } from '@angular/core/testing';

import { BackendWatcherService } from './backend-watcher.service';

describe('BackendWatcherService', () => {
  let service: BackendWatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
