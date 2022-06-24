import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonemailComponent } from './commonemail.component';

describe('CommonemailComponent', () => {
  let component: CommonemailComponent;
  let fixture: ComponentFixture<CommonemailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonemailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
