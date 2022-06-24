import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmappingdefaulttaskconfigurationrepositoryComponent } from './taskmappingdefaulttaskconfigurationrepository.component';

describe('TaskmappingdefaulttaskconfigurationrepositoryComponent', () => {
  let component: TaskmappingdefaulttaskconfigurationrepositoryComponent;
  let fixture: ComponentFixture<TaskmappingdefaulttaskconfigurationrepositoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmappingdefaulttaskconfigurationrepositoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmappingdefaulttaskconfigurationrepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
