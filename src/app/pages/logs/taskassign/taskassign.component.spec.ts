import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskassignComponent } from './taskassign.component';

describe('TaskassignComponent', () => {
  let component: TaskassignComponent;
  let fixture: ComponentFixture<TaskassignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskassignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
