import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportManageEntityMappingComponent } from './import-manage-entity-mapping.component';

describe('ImportManageEntityMappingComponent', () => {
  let component: ImportManageEntityMappingComponent;
  let fixture: ComponentFixture<ImportManageEntityMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportManageEntityMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportManageEntityMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
