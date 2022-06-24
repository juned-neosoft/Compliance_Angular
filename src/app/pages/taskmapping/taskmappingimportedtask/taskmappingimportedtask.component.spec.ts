import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmappingimportedtaskComponent } from './taskmappingimportedtask.component';

describe('TaskmappingimportedtaskComponent', () => {
  let component: TaskmappingimportedtaskComponent;
  let fixture: ComponentFixture<TaskmappingimportedtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmappingimportedtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmappingimportedtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
