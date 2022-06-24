import { TestBed } from '@angular/core/testing';

import { ManageentitymappingsService } from './manageentitymappings.service';

describe('ManageentitymappingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageentitymappingsService = TestBed.get(ManageentitymappingsService);
    expect(service).toBeTruthy();
  });
});
