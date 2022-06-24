import { TestBed } from '@angular/core/testing';

import { CommonemailService } from './commonemail.service';

describe('CommonemailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonemailService = TestBed.get(CommonemailService);
    expect(service).toBeTruthy();
  });
});
