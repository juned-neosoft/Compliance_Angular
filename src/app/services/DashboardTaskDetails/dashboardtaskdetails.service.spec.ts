import { TestBed } from '@angular/core/testing';

import { DashboardtaskdetailsService } from './dashboardtaskdetails.service';

describe('DashboardtaskdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardtaskdetailsService = TestBed.get(DashboardtaskdetailsService);
    expect(service).toBeTruthy();
  });
});
