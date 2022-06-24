import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginlogsComponent } from './loginlogs.component';

describe('LoginlogsComponent', () => {
  let component: LoginlogsComponent;
  let fixture: ComponentFixture<LoginlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
