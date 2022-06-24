import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAssignTaskComponent } from './import-assign-task.component';

describe('ImportAssignTaskComponent', () => {
  let component: ImportAssignTaskComponent;
  let fixture: ComponentFixture<ImportAssignTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportAssignTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAssignTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
