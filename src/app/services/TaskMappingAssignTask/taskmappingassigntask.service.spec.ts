import { TestBed } from '@angular/core/testing';

import { TaskmappingassigntaskService } from './taskmappingassigntask.service';

describe('TaskmappingassigntaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskmappingassigntaskService = TestBed.get(TaskmappingassigntaskService);
    expect(service).toBeTruthy();
  });
});
