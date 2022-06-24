import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditshowcausenoticeComponent } from './editshowcausenotice.component';

describe('EditshowcausenoticeComponent', () => {
  let component: EditshowcausenoticeComponent;
  let fixture: ComponentFixture<EditshowcausenoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditshowcausenoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditshowcausenoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
