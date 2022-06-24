import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageentitymappingsComponent } from './manageentitymappings.component';

describe('ManageentitymappingsComponent', () => {
  let component: ManageentitymappingsComponent;
  let fixture: ComponentFixture<ManageentitymappingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageentitymappingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageentitymappingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
