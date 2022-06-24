import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEntityComponent } from './import-entity.component';

describe('ImportEntityComponent', () => {
  let component: ImportEntityComponent;
  let fixture: ComponentFixture<ImportEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
