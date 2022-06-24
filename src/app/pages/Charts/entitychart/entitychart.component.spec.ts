import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitychartComponent } from './entitychart.component';

describe('EntitychartComponent', () => {
  let component: EntitychartComponent;
  let fixture: ComponentFixture<EntitychartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitychartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitychartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
