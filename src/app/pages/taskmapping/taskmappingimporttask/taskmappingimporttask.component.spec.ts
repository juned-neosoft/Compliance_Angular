import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmappingimporttaskComponent } from './taskmappingimporttask.component';

describe('TaskmappingimporttaskComponent', () => {
  let component: TaskmappingimporttaskComponent;
  let fixture: ComponentFixture<TaskmappingimporttaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmappingimporttaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmappingimporttaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
