import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefunctionsComponent } from './createfunctions.component';

describe('CreatefunctionsComponent', () => {
  let component: CreatefunctionsComponent;
  let fixture: ComponentFixture<CreatefunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatefunctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
