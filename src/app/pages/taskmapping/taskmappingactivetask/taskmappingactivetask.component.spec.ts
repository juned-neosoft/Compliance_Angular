import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmappingactivetaskComponent } from './taskmappingactivetask.component';

describe('TaskmappingactivetaskComponent', () => {
  let component: TaskmappingactivetaskComponent;
  let fixture: ComponentFixture<TaskmappingactivetaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmappingactivetaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmappingactivetaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
