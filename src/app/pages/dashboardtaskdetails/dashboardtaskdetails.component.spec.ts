import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardtaskdetailsComponent } from './dashboardtaskdetails.component';

describe('DashboardtaskdetailsComponent', () => {
  let component: DashboardtaskdetailsComponent;
  let fixture: ComponentFixture<DashboardtaskdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardtaskdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardtaskdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
