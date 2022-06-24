import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShowCauseNoticeComponent } from './create-show-cause-notice.component';

describe('CreateShowCauseNoticeComponent', () => {
  let component: CreateShowCauseNoticeComponent;
  let fixture: ComponentFixture<CreateShowCauseNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShowCauseNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShowCauseNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
