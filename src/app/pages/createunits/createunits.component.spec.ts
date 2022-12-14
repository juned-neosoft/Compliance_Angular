import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateunitsComponent } from './createunits.component';

describe('CreateunitsComponent', () => {
  let component: CreateunitsComponent;
  let fixture: ComponentFixture<CreateunitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateunitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateunitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
