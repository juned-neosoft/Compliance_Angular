import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShowCauseNotice } from 'src/app/models/ShowCauseNotice/show-cause-notice.model';
import { Users } from 'src/app/models/Users/users';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { ShowcausenoticeService } from 'src/app/services/ShowCauseNotice/showcausenotice.service';
import { UsersService } from 'src/app/services/Users/users.service';

@Component({
  selector: 'app-create-show-cause-notice',
  templateUrl: './create-show-cause-notice.component.html',
  styleUrls: ['./create-show-cause-notice.component.css'],
  providers: [DatePipe]
})
export class CreateShowCauseNoticeComponent implements OnInit {
  ShowCauseNotice = new ShowCauseNotice();
  multipleDoc: any;
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

  formData = new FormData();
  constructor(
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private alertify: AlertifyService,
    private showcaseService: ShowcausenoticeService,
    private datePipe: DatePipe,
    private router:Router
  ) {
    // this.ShowCauseNotice.scau_notice_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    // this.ShowCauseNotice.scau_deadline_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    // this.ShowCauseNotice.scau_received_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    // this.ShowCauseNotice.scau_remainder_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.BindSelectList();
  }

  // GetEntityUnitFunctionUser()
  // {
  //   this.showcaseService.GetEntityUnitFunctionUser().subscribe((data:any)=>{
  //          console.log(data);
  //   })
  // }


  BindSelectList() {
    this.spinner.show();
    this.showcaseService.GetEntityUnitFunctionUser().subscribe(
      (res: any) => {
        console.log(res);
        this.entityListFromAPI = res.data[0].Entity;
        this.unitListFromAPI = res.data[0].Unit;
        this.functionListFromAPI = res.data[0].Function;
        this.userListApi = res.data[0].UserList;

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
    this.unitListBinding.push(this.unitListFromAPI.filter(x => x.orga_id == Number(this.ShowCauseNotice.scau_orga_id)));
    this.ListUnit = this.unitListBinding[0];
    this.spinner.hide();
  }

  changeFunction() {
    this.spinner.show();
    this.functionListBinding = [];
    this.usersData.user_department_id = 0;
    this.functionListBinding.push(this.functionListFromAPI.filter(x => x.orga_id == Number(this.ShowCauseNotice.scau_loca_id)));
    this.listFunction = this.functionListBinding[0];
    this.spinner.hide();
  }

  userFunction() {
    this.spinner.show();
    this.userListBinding = [];

    this.userListBinding.push(this.userListApi.filter(x => x.dept_id == Number(this.ShowCauseNotice.scau_dept_id)));
    this.ListUsers = this.userListBinding[0];
    this.spinner.hide();
  }

  onFileChange($event) {
    this.selectedfile = $event.target.files;

  }

  SubmitForm() {
    this.spinner.show();
    this.ShowCauseNotice.scau_notice_date =this.datePipe.transform(this.ShowCauseNotice.scau_notice_date,"dd-MM-yyyy");
    this.ShowCauseNotice.scau_deadline_date =this.datePipe.transform(this.ShowCauseNotice.scau_deadline_date,"dd-MM-yyyy");
    this.ShowCauseNotice.scau_received_date = this.datePipe.transform(this.ShowCauseNotice.scau_received_date,"dd-MM-yyyy");
    this.ShowCauseNotice.scau_remainder_date = this.datePipe.transform(this.ShowCauseNotice.scau_remainder_date,"dd-MM-yyyy");

    this.showcaseService.InsertShowCauseNotice(this.ShowCauseNotice, this.selectedfile).subscribe((data: any) => {
     
      if (data.status == "Success") {
        this.alertify.success(data.message);
        this.router.navigate(["/show-cause-notice"]);
        
      }
      else {
        this.alertify.error("Record not saved");
      }
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
      })
  }


}
