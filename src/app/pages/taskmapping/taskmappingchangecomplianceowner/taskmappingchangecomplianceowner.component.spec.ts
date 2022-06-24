import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmappingchangecomplianceownerComponent } from './taskmappingchangecomplianceowner.component';

describe('TaskmappingchangecomplianceownerComponent', () => {
  let component: TaskmappingchangecomplianceownerComponent;
  let fixture: ComponentFixture<TaskmappingchangecomplianceownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmappingchangecomplianceownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmappingchangecomplianceownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
