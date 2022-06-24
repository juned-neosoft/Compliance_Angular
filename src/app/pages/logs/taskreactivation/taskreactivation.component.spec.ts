import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskreactivationComponent } from './taskreactivation.component';

describe('TaskreactivationComponent', () => {
  let component: TaskreactivationComponent;
  let fixture: ComponentFixture<TaskreactivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskreactivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskreactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
