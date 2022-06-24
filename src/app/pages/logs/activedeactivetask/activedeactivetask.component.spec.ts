import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivedeactivetaskComponent } from './activedeactivetask.component';

describe('ActivedeactivetaskComponent', () => {
  let component: ActivedeactivetaskComponent;
  let fixture: ComponentFixture<ActivedeactivetaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivedeactivetaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivedeactivetaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
