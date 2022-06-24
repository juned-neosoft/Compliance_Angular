import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedesignationsComponent } from './createdesignations.component';

describe('CreatedesignationsComponent', () => {
  let component: CreatedesignationsComponent;
  let fixture: ComponentFixture<CreatedesignationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedesignationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedesignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
