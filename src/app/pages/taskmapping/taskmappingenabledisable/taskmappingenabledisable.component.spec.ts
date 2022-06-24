import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmappingenabledisableComponent } from './taskmappingenabledisable.component';

describe('TaskmappingenabledisableComponent', () => {
  let component: TaskmappingenabledisableComponent;
  let fixture: ComponentFixture<TaskmappingenabledisableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmappingenabledisableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmappingenabledisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
