import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcausenoticeComponent } from './showcausenotice.component';

describe('ShowcausenoticeComponent', () => {
  let component: ShowcausenoticeComponent;
  let fixture: ComponentFixture<ShowcausenoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcausenoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcausenoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
