import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliancereportComponent } from './compliancereport.component';

describe('CompliancereportComponent', () => {
  let component: CompliancereportComponent;
  let fixture: ComponentFixture<CompliancereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompliancereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompliancereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
