import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmanageentitymappingsComponent } from './editmanageentitymappings.component';

describe('EditmanageentitymappingsComponent', () => {
  let component: EditmanageentitymappingsComponent;
  let fixture: ComponentFixture<EditmanageentitymappingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmanageentitymappingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmanageentitymappingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
