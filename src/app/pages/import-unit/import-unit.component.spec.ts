import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportUnitComponent } from './import-unit.component';

describe('ImportUnitComponent', () => {
  let component: ImportUnitComponent;
  let fixture: ComponentFixture<ImportUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
