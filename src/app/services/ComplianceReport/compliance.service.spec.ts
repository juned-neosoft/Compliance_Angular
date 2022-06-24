import { TestBed } from '@angular/core/testing';

import { ComplianceService } from './compliance.service';

describe('ComplianceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComplianceService = TestBed.get(ComplianceService);
    expect(service).toBeTruthy();
  });
});
