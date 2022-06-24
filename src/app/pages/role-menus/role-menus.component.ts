import { Component, OnInit } from '@angular/core';
import {Menus} from '../../models/Menus/menus';

@Component({
  selector: 'app-role-menus',
  templateUrl: './role-menus.component.html',
  styleUrls: ['./role-menus.component.css']
})
export class RoleMenusComponent implements OnInit {
public menus = new Menus();
  constructor() { }

  ngOnInit() {
  }

  SubmitForm() {
  }
}
