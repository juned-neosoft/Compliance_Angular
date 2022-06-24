import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompliancecertificateComponent } from './compliancecertificate.component';

describe('CompliancecertificateComponent', () => {
  let component: CompliancecertificateComponent;
  let fixture: ComponentFixture<CompliancecertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompliancecertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompliancecertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
