import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionchartComponent } from './functionchart.component';

describe('FunctionchartComponent', () => {
  let component: FunctionchartComponent;
  let fixture: ComponentFixture<FunctionchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
