import { TestBed } from '@angular/core/testing';

import { TaskmappingtaskconfigurationService } from './taskmappingtaskconfiguration.service';

describe('TaskmappingtaskconfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskmappingtaskconfigurationService = TestBed.get(TaskmappingtaskconfigurationService);
    expect(service).toBeTruthy();
  });
});
