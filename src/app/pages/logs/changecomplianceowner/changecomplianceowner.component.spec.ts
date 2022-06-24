import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangecomplianceownerComponent } from './changecomplianceowner.component';

describe('ChangecomplianceownerComponent', () => {
  let component: ChangecomplianceownerComponent;
  let fixture: ComponentFixture<ChangecomplianceownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangecomplianceownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangecomplianceownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
