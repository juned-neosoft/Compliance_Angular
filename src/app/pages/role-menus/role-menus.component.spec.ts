import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenusComponent } from './role-menus.component';

describe('RoleMenusComponent', () => {
  let component: RoleMenusComponent;
  let fixture: ComponentFixture<RoleMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
