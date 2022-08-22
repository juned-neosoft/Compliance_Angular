import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from 'src/app/services/Calendar/calendar.service';
import { Router } from '@angular/router';
import { Calendar } from 'src/app/models/Calendar/calendar';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { CommonService } from 'src/app/services/Common/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  public calendarPlugins = [dayGridPlugin];
  public Events = [];
  public responseData = [];
  public calendar = new Calendar();
  public getEntityListFromAPI: any;
  public getUnitListFromAPI: any;
  public getFunctionListFromAPI: any;
  public getOwnerListFromAPI: any;
  public getAppoverListFromAPI: any;
  public getFunctionHeadListFromAPI: any;
  public entityHasError = true;

  public parentData: string;
  public showCalendar = true;
  public showTaskDetails = false;

  constructor(
    private calendarService: CalendarService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.getEntityListFromAPI = [];
    this.getUnitListFromAPI = [];
    this.getFunctionListFromAPI = [];
    this.getOwnerListFromAPI = [];
    this.getAppoverListFromAPI = [];
    this.getFunctionHeadListFromAPI = [];
  }

  ngAfterViewInit() {
    this.onCall()
  }

  onLoad() {
    this.spinner.show();
    this.getEntityListFromAPI = [];
    this.getUnitListFromAPI = [];
    this.getFunctionListFromAPI = [];
    this.getOwnerListFromAPI = [];
    this.getAppoverListFromAPI = [];
    this.getFunctionHeadListFromAPI = [];

    this.calendar.entitySearch = 0;
    this.calendar.unitSearch = 0;
    this.calendar.functionSearch = 0;
    this.calendar.ownerSearch = 0;
    this.calendar.approverSearch = 0;
    this.calendar.functionHeadSearch = 0;

    this.commonService.getEntities().subscribe(
      res => {
        this.getEntityListFromAPI = res.response.data.entity_list;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getEntityListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );


  }

  onCall() {
    this.spinner.show();
    this.calendarService.GetListOnLoad().subscribe(
      res => {
        if (res.response.status == 'Success') {
          this.spinner.hide();
          console.log(res, 'res run');
          this.responseData = res.response.data.task_assigned_to_user;
          this.onLoad();
        }
        else {
          this.spinner.hide();
          this.alertify.error(res.response.status);
        }
      },
      err => {
        this.spinner.hide();
        this.responseData = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  handleDateClick(event) {
    var data = '';
    data = event.target.innerText;

    for (let i = 0; i < this.responseData.length; i++) {
      if (this.responseData[i].client_task_id == data) {
        this.showTaskDetailsPage(data);
        break;
      }
    }
  }

  ValidateEntityFilter(value) {
    if (value === '0' || value === 0) {
      this.entityHasError = true;
    } else {
      this.entityHasError = false;

      this.spinner.show();

      this.getUnitListFromAPI = [];
      this.getFunctionListFromAPI = [];
      this.getOwnerListFromAPI = [];
      this.getAppoverListFromAPI = [];
      this.getFunctionHeadListFromAPI = [];

      this.calendar.unitSearch = 0;
      this.calendar.functionSearch = 0;
      this.calendar.ownerSearch = 0;
      this.calendar.approverSearch = 0;
      this.calendar.functionHeadSearch = 0;

      this.commonService.getUnits(this.calendar.entitySearch).subscribe(
        res => {
          this.spinner.hide();
          this.getUnitListFromAPI = res.response.data.unit_list;
        },
        err => {
          this.spinner.hide();
          this.getUnitListFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );
    }
  }

  ValidateUnitFilter() {
    this.spinner.show();

    this.getFunctionListFromAPI = [];
    this.getOwnerListFromAPI = [];
    this.getAppoverListFromAPI = [];
    this.getFunctionHeadListFromAPI = [];

    this.calendar.functionSearch = 0;
    this.calendar.ownerSearch = 0;
    this.calendar.approverSearch = 0;
    this.calendar.functionHeadSearch = 0;

    this.commonService.getFunction(this.calendar.unitSearch).subscribe(
      res => {
        this.spinner.hide();
        this.getFunctionListFromAPI = res.response.data.function_list;
      },
      err => {
        this.spinner.hide();
        this.getFunctionListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  ValidateFunctionFilter() {
    this.spinner.show();

    this.getOwnerListFromAPI = [];
    this.getAppoverListFromAPI = [];
    this.getFunctionHeadListFromAPI = [];

    this.calendar.ownerSearch = 0;
    this.calendar.approverSearch = 0;
    this.calendar.functionHeadSearch = 0;

    const data = {
      dept_id: parseInt(this.calendar.functionSearch.toString()),
      loca_id: parseInt(this.calendar.unitSearch.toString()),
      orga_id: parseInt(this.calendar.entitySearch.toString())
    };

    this.commonService.GetExeListForChangeOwner(data).subscribe(
      res => {
        this.spinner.hide();
        this.getOwnerListFromAPI = res.response.data.Executor;
      },
      err => {
        this.spinner.hide();
        this.getOwnerListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  ValidateOwnerFilter() {
    this.spinner.show();

    this.getAppoverListFromAPI = [];
    this.getFunctionHeadListFromAPI = [];

    this.calendar.approverSearch = 0;
    this.calendar.functionHeadSearch = 0;

    const data = {
      dept_id: parseInt(this.calendar.functionSearch.toString()),
      loca_id: parseInt(this.calendar.unitSearch.toString()),
      orga_id: parseInt(this.calendar.entitySearch.toString())
    };

    this.commonService.GetEvalListForChangeOwner(data).subscribe(
      res => {
        this.spinner.hide();
        this.getAppoverListFromAPI = res.response.data.Evaluator;
      },
      err => {
        this.spinner.hide();
        this.getAppoverListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  ValidateApproverFilter() {
    this.spinner.show();

    this.getFunctionHeadListFromAPI = [];

    this.calendar.functionHeadSearch = 0;

    const data = {
      dept_id: parseInt(this.calendar.functionSearch.toString()),
      loca_id: parseInt(this.calendar.unitSearch.toString()),
      orga_id: parseInt(this.calendar.entitySearch.toString())
    };

    this.commonService.GetFunHeadListForChangeOwner(data).subscribe(
      res => {
        this.spinner.hide();
        this.getFunctionHeadListFromAPI = res.response.data.Function_Head;
      },
      err => {
        this.spinner.hide();
        this.getFunctionHeadListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  ValidateFunctionHeadFilter() {
  }

  getClassName(value) {
    if (value == "Delayed") {
      return 'event-bg-delayed';
    }
    else if (value == "Delayed_Reported") {
      return 'event-bg-delayed-reported';
    }
    else if (value == "Complied") {
      return 'event-bg-complied';
    }
    else if (value == "Non Complied") {
      return 'event-bg-non-complied';
    }
    else if (value == "Posing Risk") {
      return 'event-bg-posing-risk';
    }
    else if (value == "WaitingForApproval") {
      return 'event-bg-waiting-for-approval';
    }
    else if (value == "Reopned") {
      return 'event-bg-reopned';
    }
    else {
      return 'event-bg-blue';
    }
  }

  onSearch() {
    this.spinner.show();
    this.Events = [];
    console.log(this.responseData);
    if (this.responseData.length > 0) {
      for (let i = 0; i < this.responseData.length; i++) {
        if (this.calendar.entitySearch != 0 && (
          this.calendar.unitSearch != 0 ||
          this.calendar.functionSearch != 0 ||
          this.calendar.ownerSearch != 0 ||
          this.calendar.approverSearch != 0 ||
          this.calendar.functionHeadSearch != 0)) {
          if (this.responseData[i].task_orga_id == this.calendar.entitySearch && (
            this.responseData[i].task_loca_id == this.calendar.unitSearch ||
            this.responseData[i].task_dept_id == this.calendar.functionSearch ||
            this.responseData[i].task_performer_id == this.calendar.ownerSearch ||
            this.responseData[i].task_reviewer_id == this.calendar.approverSearch ||
            this.responseData[i].task_function_head_id == this.calendar.functionHeadSearch)) {
            this.Events.push(
              {
                title: this.responseData[i].client_task_id,
                date: this.responseData[i].legal_due_date.split(' ')[0],
                className: this.getClassName(this.responseData[i].task_status)
              });
          }
        }
        else if (this.calendar.entitySearch != 0) {
          if (this.responseData[i].task_orga_id == this.calendar.entitySearch) {
            this.Events.push(
              {
                title: this.responseData[i].client_task_id,
                date: this.responseData[i].legal_due_date.split(' ')[0],
                className: this.getClassName(this.responseData[i].task_status)
              });
          }
        }
      }
      this.spinner.hide();
    }
  }

  showTaskDetailsPage(value) {
    window.scroll(0, 0);
    this.parentData = value;
    this.showCalendar = false;
    this.showTaskDetails = true;
  }

  showCalendarPage() {
    window.scroll(0, 0);
    this.parentData = '';
    this.showCalendar = true;
    this.showTaskDetails = false;
  }
}
