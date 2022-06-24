import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Commonemail } from 'src/app/models/CommonEmail/commonemail';
import { Users } from 'src/app/models/Users/users';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { CommonemailService } from 'src/app/services/CommonEmail/commonemail.service';
import { ShowcausenoticeService } from 'src/app/services/ShowCauseNotice/showcausenotice.service';
import { UsersService } from 'src/app/services/Users/users.service';

@Component({
  selector: 'app-commonemail',
  templateUrl: './commonemail.component.html',
  styleUrls: ['./commonemail.component.css']
})
export class CommonemailComponent implements OnInit {
  public commonEmial = new Commonemail();

  selectedfile: any;

  entityListFromAPI: any;
  unitListFromAPI: any;
  functionListFromAPI: any;
  userListApi: any;
  usersData = new Users();

  unitListBinding: any;
  functionListBinding: any;
  userListBinding: any;

  ListUnit: any = [];
  listFunction: any = [];
  ListUsers: any = [];

  selectedItems = [];
  selectedEmail: any = [];
  dropdownSettings = {};
  constructor(
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private alertify: AlertifyService,
    private showcaseService: ShowcausenoticeService,
    private router: Router,
    private commonEmailService: CommonemailService
  ) { }

  ngOnInit() {
    this.BindSelectList();
    //Setting For Multiselect Dropdown
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'user_email',
      textField: 'user_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }



  BindSelectList() {
    this.spinner.show();
    // this.showcaseService.GetEntityUnitFunctionUser().subscribe(
    this.commonEmailService.getAllEntityUnitFunctionUser().subscribe(
      (res: any) => {
        console.log(res);
        this.entityListFromAPI = res.response.data.user_access_for_common_email.Entity;
        this.unitListFromAPI = res.response.data.user_access_for_common_email.Unit;
        this.functionListFromAPI = res.response.data.user_access_for_common_email.Function;
        this.userListApi = res.response.data.user_access_for_common_email.Users;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();

        this.alertify.error(`Data not found`);
      }
    );
  }

  changeUnit() {
    this.spinner.show();
    this.unitListBinding = [];
    this.functionListBinding = [];
    this.unitListBinding.push(this.unitListFromAPI.filter(x => x.orga_id == Number(this.commonEmial.entity)));
    this.ListUnit = this.unitListBinding[0];
    this.spinner.hide();
  }

  changeFunction() {
    this.spinner.show();
    this.functionListBinding = [];
    this.usersData.user_department_id = 0;
    this.functionListBinding.push(this.functionListFromAPI.filter(x => x.orga_id == Number(this.commonEmial.unit)));
    this.listFunction = this.functionListBinding[0];
    this.spinner.hide();
  }

  userFunction() {
    this.spinner.show();
    this.userListBinding = [];

    this.userListBinding.push(this.userListApi.filter(x => x.dept_id == Number(this.commonEmial.fuction)));
    this.ListUsers = this.userListBinding[0];
    this.spinner.hide();
  }

  onItemSelect(item: any) {
    this.selectedEmail.push({ user_email: item.user_email, user_name: item.user_name });
  }
  onSelectAll(items: any) {
    this.selectedEmail = [];
    for (var i = 0; i < items.length; i++) {
      this.selectedEmail.push({ user_email: items[i].user_email, user_name: items[i].user_name });
    }

  }

  onItemDeSelect(item: any) {
    this.selectedEmail = this.selectedEmail.filter((x) => x.user_email != item.user_email);
  }


  onFileChange($event) {
    this.selectedfile = $event.target.files;

  }

  SubmitForm() {
    this.spinner.show();
    this.commonEmailService.SenCommonEmail(this.commonEmial, this.selectedfile, this.selectedEmail).subscribe((data: any) => {
      console.log(data);
      this.spinner.hide();
    },
      error => {
        this.alertify.error("Email not sent");
        this.spinner.hide();
      })
  }



}
