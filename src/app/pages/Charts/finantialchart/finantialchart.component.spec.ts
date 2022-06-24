import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinantialchartComponent } from './finantialchart.component';

describe('FinantialchartComponent', () => {
  let component: FinantialchartComponent;
  let fixture: ComponentFixture<FinantialchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinantialchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinantialchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
