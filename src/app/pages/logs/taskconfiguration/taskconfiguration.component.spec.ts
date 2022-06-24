import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskconfigurationComponent } from './taskconfiguration.component';

describe('TaskconfigurationComponent', () => {
  let component: TaskconfigurationComponent;
  let fixture: ComponentFixture<TaskconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
