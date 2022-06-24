import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditentityComponent } from './editentity.component';

describe('EditentityComponent', () => {
  let component: EditentityComponent;
  let fixture: ComponentFixture<EditentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
