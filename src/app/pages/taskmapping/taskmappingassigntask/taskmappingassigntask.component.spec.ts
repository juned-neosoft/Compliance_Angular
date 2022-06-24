import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmappingassigntaskComponent } from './taskmappingassigntask.component';

describe('TaskmappingassigntaskComponent', () => {
  let component: TaskmappingassigntaskComponent;
  let fixture: ComponentFixture<TaskmappingassigntaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmappingassigntaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmappingassigntaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
