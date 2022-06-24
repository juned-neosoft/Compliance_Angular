import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmappingtaskconfigurationComponent } from './taskmappingtaskconfiguration.component';

describe('TaskmappingtaskconfigurationComponent', () => {
  let component: TaskmappingtaskconfigurationComponent;
  let fixture: ComponentFixture<TaskmappingtaskconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmappingtaskconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmappingtaskconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
