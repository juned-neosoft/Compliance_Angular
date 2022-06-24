import { TestBed } from '@angular/core/testing';

import { ShowcausenoticeService } from './showcausenotice.service';

describe('ShowcausenoticeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowcausenoticeService = TestBed.get(ShowcausenoticeService);
    expect(service).toBeTruthy();
  });
});
