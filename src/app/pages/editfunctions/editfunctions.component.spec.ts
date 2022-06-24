import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfunctionsComponent } from './editfunctions.component';

describe('EditfunctionsComponent', () => {
  let component: EditfunctionsComponent;
  let fixture: ComponentFixture<EditfunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfunctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
