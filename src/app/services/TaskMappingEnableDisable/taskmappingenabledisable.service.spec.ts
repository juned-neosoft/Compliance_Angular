import { TestBed } from '@angular/core/testing';

import { TaskmappingenabledisableService } from './taskmappingenabledisable.service';

describe('TaskmappingenabledisableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskmappingenabledisableService = TestBed.get(TaskmappingenabledisableService);
    expect(service).toBeTruthy();
  });
});
