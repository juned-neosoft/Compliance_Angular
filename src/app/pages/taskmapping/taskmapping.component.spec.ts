import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmappingComponent } from './taskmapping.component';

describe('TaskmappingComponent', () => {
  let component: TaskmappingComponent;
  let fixture: ComponentFixture<TaskmappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
