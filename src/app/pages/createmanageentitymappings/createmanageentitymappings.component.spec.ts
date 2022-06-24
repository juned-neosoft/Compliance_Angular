import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemanageentitymappingsComponent } from './createmanageentitymappings.component';

describe('CreatemanageentitymappingsComponent', () => {
  let component: CreatemanageentitymappingsComponent;
  let fixture: ComponentFixture<CreatemanageentitymappingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatemanageentitymappingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatemanageentitymappingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
