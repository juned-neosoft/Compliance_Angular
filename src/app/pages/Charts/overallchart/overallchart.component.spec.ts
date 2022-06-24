import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallchartComponent } from './overallchart.component';

describe('OverallchartComponent', () => {
  let component: OverallchartComponent;
  let fixture: ComponentFixture<OverallchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
