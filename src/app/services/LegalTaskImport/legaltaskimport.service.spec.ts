import { TestBed } from '@angular/core/testing';

import { LegaltaskimportService } from './legaltaskimport.service';

describe('LegaltaskimportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LegaltaskimportService = TestBed.get(LegaltaskimportService);
    expect(service).toBeTruthy();
  });
});
