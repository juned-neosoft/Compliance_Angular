import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShowCauseNotice } from 'src/app/models/ShowCauseNotice/show-cause-notice.model';
import { Users } from 'src/app/models/Users/users';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { ShowcausenoticeService } from 'src/app/services/ShowCauseNotice/showcausenotice.service';
import { UsersService } from 'src/app/services/Users/users.service';

@Component({
  selector: 'app-editshowcausenotice',
  templateUrl: './editshowcausenotice.component.html',
  styleUrls: ['./editshowcausenotice.component.css'],
  providers: [DatePipe]
})
export class EditshowcausenoticeComponent implements OnInit {
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
  EditId: any = 0;
  EditData: any = {};
  constructor(
    private spinner: NgxSpinnerService,
    private usersService: UsersService,
    private alertify: AlertifyService,
    private showcaseService: ShowcausenoticeService,
    private datePipe: DatePipe,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) {
    this.EditId = this.activateRouter.snapshot.paramMap.get("id");

  }

  ngOnInit() {

    this.ShowCauseNotice.scau_notice_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.ShowCauseNotice.scau_deadline_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.ShowCauseNotice.scau_received_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.ShowCauseNotice.scau_remainder_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

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
        this.entityListFromAPI = res.data[0].Entity;
        this.unitListFromAPI = res.data[0].Unit;
        this.functionListFromAPI = res.data[0].Function;
        this.userListApi = res.data[0].UserList;

        this.spinner.hide();


        if (this.EditId > 0) {
          this.EditShowCauseNotice();
        }
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
    
    this.ShowCauseNotice.scau_notice_date = this.datePipe.transform(this.ShowCauseNotice.scau_notice_date,"dd-MM-yyyy");
    this.ShowCauseNotice.scau_deadline_date = this.datePipe.transform(this.ShowCauseNotice.scau_deadline_date,"dd-MM-yyyy");
    this.ShowCauseNotice.scau_received_date = this.datePipe.transform(this.ShowCauseNotice.scau_received_date,"dd-MM-yyyy");
    this.ShowCauseNotice.scau_remainder_date = this.datePipe.transform(this.ShowCauseNotice.scau_remainder_date,"dd-MM-yyyy");
    
    this.showcaseService.UpdateShowCauseNotice(this.ShowCauseNotice, this.selectedfile, this.EditId).subscribe((data: any) => {
      if (data.response.status == "Success") {
        this.alertify.success("Record Updated Successfully");
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


  EditShowCauseNotice() {
    this.spinner.show();
    this.showcaseService.EditShowCuaseNotice(this.EditId).subscribe((data: any) => {
      this.EditData = data.data.ShowCauseNoticeDetails;
      this.ShowCauseNotice.scau_orga_id = this.EditData.orga_id;
      this.changeUnit();
      this.ShowCauseNotice.scau_loca_id = this.EditData.loca_id;
      this.changeFunction();
      this.ShowCauseNotice.scau_dept_id = this.EditData.dept_id;
      this.userFunction()
      this.ShowCauseNotice.scau_ralated_to = this.EditData.related_to;
      this.ShowCauseNotice.scau_comments = this.EditData.comments;
      this.ShowCauseNotice.scau_action_taken = this.EditData.action_taken;
      this.ShowCauseNotice.scau_next_action_item = this.EditData.next_action_item;
      this.ShowCauseNotice.scau_responsible_person = this.EditData.responsible_user_id;
      this.ShowCauseNotice.scau_reporting_person = this.EditData.reporting_user_id;
      this.ShowCauseNotice.scau_notice_date = this.ConvertDateFormat(this.EditData.notice_date);
      this.ShowCauseNotice.scau_received_date = this.ConvertDateFormat(this.EditData.recieved_date);
      this.ShowCauseNotice.scau_deadline_date = this.ConvertDateFormat(this.EditData.deadline_date);
      this.ShowCauseNotice.scau_remainder_date = this.ConvertDateFormat(this.EditData.reminder_date);
     
      this.spinner.hide();
    })
  }

  ConvertDateFormat(dateString) {
    var convertDate = dateString.split('-');

    return `${convertDate[2]}-${convertDate[1]}-${convertDate[0]}`;
  }

}
