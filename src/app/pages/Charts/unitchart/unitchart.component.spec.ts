import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitchartComponent } from './unitchart.component';

describe('UnitchartComponent', () => {
  let component: UnitchartComponent;
  let fixture: ComponentFixture<UnitchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
