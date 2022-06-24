import { Injectable } from '@angular/core';
import { Menus } from '../../models/Menus/menus';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor() { }

  GetMenus(){
    var menus = new Menus();

    menus.Calendar = JSON.parse(localStorage.getItem('user_info')).menu.Calendar;
    menus.ComplianceCertificate = JSON.parse(localStorage.getItem('user_info')).menu.ComplianceCertificate;
    menus.ComplianceReport = JSON.parse(localStorage.getItem('user_info')).menu.ComplianceReport;
    menus.Designation = JSON.parse(localStorage.getItem('user_info')).menu.Designation;
    menus.Document = JSON.parse(localStorage.getItem('user_info')).menu.Document;
    menus.Entity = JSON.parse(localStorage.getItem('user_info')).menu.Entity;
    menus.ExportData = JSON.parse(localStorage.getItem('user_info')).menu.ExportData;
    menus.Functions = JSON.parse(localStorage.getItem('user_info')).menu.Functions;
    menus.ManageEntityMappings = JSON.parse(localStorage.getItem('user_info')).menu.ManageEntityMappings;
    menus.Repository = JSON.parse(localStorage.getItem('user_info')).menu.Repository;
    menus.Roles = JSON.parse(localStorage.getItem('user_info')).menu.Roles;
    menus.ShowCauseNotice = JSON.parse(localStorage.getItem('user_info')).menu.ShowCauseNotice;
    menus.Support = JSON.parse(localStorage.getItem('user_info')).menu.Support;
    menus.TaskMapping = JSON.parse(localStorage.getItem('user_info')).menu.TaskMapping;
    menus.Unit = JSON.parse(localStorage.getItem('user_info')).menu.Unit;
    menus.Users = JSON.parse(localStorage.getItem('user_info')).menu.Users;
    menus.menu_id = JSON.parse(localStorage.getItem('user_info')).menu.menu_id;

    return menus;
  }
}
