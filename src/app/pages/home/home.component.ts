import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MenusService } from '../../services/Menus/menus.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public roleID: number;
  public AuthMenus: any;
  constructor(
    private router: Router,
    private menusService: MenusService
  ) {
    this.roleID = 0;
  }

  ngOnInit() {
    this.roleID = parseInt(JSON.parse(localStorage.getItem('user_info')).app_role_id);
    this.AuthMenus = this.menusService.GetMenus();
  }

  clickOnMenu(value) {
    document.getElementById('AdminMenus_Close').click();

    if (value == 'users') {
      this.router.navigate([`/users`]);
    }

    if (value == 'entity') {
      this.router.navigate([`/entity`]);
    }

    if (value == 'unit') {
      this.router.navigate([`/units`]);
    }

    if (value == 'function') {
      this.router.navigate([`/functions`]);
    }

    if (value == 'roles') {
      this.router.navigate([`/roles`]);
    }

    if (value == 'designation') {
      this.router.navigate([`/designations`]);
    }

    if (value == 'manage_entity_mapping') {
      this.router.navigate([`/manageentitymappings`]);
    }

    if (value == 'task_mapping') {
      this.router.navigate([`/task-mapping`]);
    }

    if (value == 'sub_task') {
      // this.router.navigate([`/`]);
    }

    if (value == 'export_data') {
      this.router.navigate([`/export-data`]);
    }

    if (value == 'common_email') {
      this.router.navigate([`/common-email`]);
    }

    if (value == 'logs') {
      this.router.navigate([`/logs`]);
    }

    if (value == 'query_builder') {
      this.router.navigate([`/query-builder`]);
    }

  }
}
