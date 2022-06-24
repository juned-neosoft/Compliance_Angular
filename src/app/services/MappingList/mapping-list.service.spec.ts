import { TestBed } from '@angular/core/testing';

import { MappingListService } from './mapping-list.service';

describe('MappingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MappingListService = TestBed.get(MappingListService);
    expect(service).toBeTruthy();
  });
});
