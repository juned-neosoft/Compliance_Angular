import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmappingdefaulttaskconfigurationComponent } from './taskmappingdefaulttaskconfiguration.component';

describe('TaskmappingdefaulttaskconfigurationComponent', () => {
  let component: TaskmappingdefaulttaskconfigurationComponent;
  let fixture: ComponentFixture<TaskmappingdefaulttaskconfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmappingdefaulttaskconfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmappingdefaulttaskconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
