import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportlogsComponent } from './reportlogs.component';

describe('ReportlogsComponent', () => {
  let component: ReportlogsComponent;
  let fixture: ComponentFixture<ReportlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportlogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
