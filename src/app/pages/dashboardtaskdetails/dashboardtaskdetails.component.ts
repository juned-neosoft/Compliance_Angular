import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { UpdateTask } from 'src/app/models/Dashboard/dashboard-task-details';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { DashboardService } from 'src/app/services/Dashboard/dashboard.service';
import { DashboardtaskdetailsService } from 'src/app/services/DashboardTaskDetails/dashboardtaskdetails.service';
import { DashboardTaskDetails, DeleteTaskModel, ReasonForNonComplianceTask, EditDatesModel, ReOpenTaskModel, ApproveTaskModel, CompleteUpdateTaskModel } from 'src/app/models/Dashboard/dashboard-task-details';
import { CommonService } from 'src/app/services/Common/common.service';

@Component({
  selector: 'app-dashboardtaskdetails',
  templateUrl: './dashboardtaskdetails.component.html',
  styleUrls: ['./dashboardtaskdetails.component.css'],
  providers: [DatePipe]
})
export class DashboardtaskdetailsComponent implements OnInit {
  @Input('FromParentData') public fromParentData;
  public Pagination = new Pagination();
  public deleteTaskModel = new DeleteTaskModel();
  public responseDataTaskDetails: any;
  public responseDataTaskHistory: any;
  public dashboardTaskDetails = new DashboardTaskDetails();
  public reOpenTaskModel = new ReOpenTaskModel();
  public updateTask = new UpdateTask();
  public reasonForNonComplianceTask = new ReasonForNonComplianceTask();
  public approveTaskModel = new ApproveTaskModel();
  public completeUpdateTaskModel = new CompleteUpdateTaskModel();
  public editDatesModel = new EditDatesModel();
  public roleID = 0;
  public errorListReasonForNonCompliance = [];
  public errorListReopen = [];
  public errorListCompleteTask = [];
  public errorListUpdateTask = [];
  public maxDate = null;
  maxChars = 250;
  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private datePipe: DatePipe,
    private dashboardService: DashboardService,
    private dashboardtaskdetailsService: DashboardtaskdetailsService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.responseDataTaskHistory = [];

    this.maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.roleID = parseInt(JSON.parse(localStorage.getItem('user_info')).sess_role_id);
    this.onload();
  }

  onload() {
    this.spinner.show();
    var data = {
      tmap_client_task_id: this.fromParentData
    };
    this.dashboardService.getHistoryOfTask(data).subscribe(
      res => {
        this.responseDataTaskHistory = [];
        this.responseDataTaskHistory = res.response.task_history;
        this.Pagination.TotalRecords = this.responseDataTaskHistory.length;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.responseDataTaskHistory = [];
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      }
    );

    this.dashboardService.getDetailsOfTask(data).subscribe(
      res => {
        this.responseDataTaskDetails = res.response.data.task_details;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Data not found`);
      }
    );
  }

  DeleteTask() {
    this.spinner.show();
    var data = {
      ttrn_completed_date: this.deleteTaskModel.ttrn_completed_date,
      ttrn_id: parseInt(this.deleteTaskModel.ttrn_id.toString()),
      ttrn_client_task_id: this.deleteTaskModel.client_task_id
    };

    this.dashboardtaskdetailsService.DeleteTaskHistory(data).subscribe(
      res => {
        if (res.response.status == 'Success') {
          this.alertify.success(res.response.message);
        }
        else {
          this.alertify.error(res.response.message);
        }
        document.getElementById('DeleteTask_Close').click();
        this.onload();
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong.`);
      }
    );
  }

  ReasonForNonCompliance() {
    this.errorListReasonForNonCompliance = [];

    if (this.reasonForNonComplianceTask.ttrn_reason_for_non_compliance == '' || this.reasonForNonComplianceTask.ttrn_reason_for_non_compliance == null) {
      this.errorListReasonForNonCompliance.push('Required Reason for Non-Compliance.');
      return false;
    }

    this.spinner.show();
    var data = {
      ttrn_id: parseInt(this.reasonForNonComplianceTask.ttrn_id.toString()),
      ttrn_reason_for_non_compliance: this.reasonForNonComplianceTask.ttrn_reason_for_non_compliance
    };

    this.dashboardtaskdetailsService.ReasonForNonCompliance(data).subscribe(
      res => {
        if (res.response.status == 'Success') {
          this.alertify.success(res.response.message);
        }
        else {
          this.alertify.error(res.response.message);
        }
        document.getElementById('ReasonForNonCompliance_Close').click();
        this.onload();
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong.`);
      }
    );
  }

  ReOpen() {
    this.errorListReopen = [];

    if (this.reOpenTaskModel.reopen_comment == '' || this.reOpenTaskModel.reopen_comment == null) {
      this.errorListReopen.push('Required Reason for Re-Opening.');
      return false;
    }

    this.spinner.show();
    var data = {
      ttrn_id: parseInt(this.reOpenTaskModel.ttrn_id.toString()),
      reopen_comment: this.reOpenTaskModel.reopen_comment
    };

    this.dashboardtaskdetailsService.ReopenTask(data).subscribe(
      res => {
        if (res.response.status == 'Success') {
          this.alertify.success(`Task re-open successfully.`);
        }
        else {
          this.alertify.error(`Task not re-open successfully.`);
        }
        document.getElementById('ReOpenTask_Close').click();
        this.onload();
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong.`);
      }
    );
  }

  ApproveTask() {
    this.spinner.show();
    var data = {
      ttrn_id: parseInt(this.approveTaskModel.ttrn_id.toString())
    };

    this.dashboardtaskdetailsService.ApproveTask(data).subscribe(
      res => {
        if (res.response.status == 'Success') {
          this.alertify.success(`Task approved successfully.`);
        }
        else {
          this.alertify.error(`Task not approved successfully.`);
        }
        document.getElementById('ApproveTask_Close').click();
        this.onload();
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong.`);
      }
    );
  }

  getConvertedDate(date) {
    var dateString = date.split('-');

    return `${dateString[2]}-${dateString[1]}-${dateString[0]}`
  }

  CompleteTask() {
    this.errorListCompleteTask = [];
    var isError = false;

    if (!this.completeUpdateTaskModel.ttrn_event_not_occure && this.completeUpdateTaskModel.ttrn_completed_date == '' || this.completeUpdateTaskModel.ttrn_completed_date == null) {
      this.errorListCompleteTask.push('Required Completion Date.');
      isError = true;
    }
    if (!this.completeUpdateTaskModel.ttrn_event_not_occure && (this.completeUpdateTaskModel.ttrn_performer_comments == '' || this.completeUpdateTaskModel.ttrn_performer_comments == null) && this.completeUpdateTaskModel.task_frequency != 'Event_Based') {
      this.errorListCompleteTask.push('Required Remarks.');
      isError = true;
    }
    if (!this.completeUpdateTaskModel.ttrn_event_not_occure && (this.completeUpdateTaskModel.ttrn_performer_comments == '' || this.completeUpdateTaskModel.ttrn_performer_comments == null) && this.completeUpdateTaskModel.task_frequency == 'Event_Based') {
      this.errorListCompleteTask.push('Required Remarks.');
      isError = true;
    }
    if (!this.completeUpdateTaskModel.ttrn_event_not_occure && (this.completeUpdateTaskModel.ttrn_reason_for_non_compliance == '' || this.completeUpdateTaskModel.ttrn_reason_for_non_compliance == null) && this.completeUpdateTaskModel.ttrn_legal_task_status != 'Complied' && (this.completeUpdateTaskModel.ttrn_legal_task_status == 'Delayed' || this.completeUpdateTaskModel.ttrn_legal_task_status == 'Non Complied')) {
      this.errorListCompleteTask.push('Required Reason For Non-Compliance.');
      isError = true;
    }
    if (this.completeUpdateTaskModel.ttrn_document == '1' && !this.completeUpdateTaskModel.ttrn_event_not_occure && (this.completeUpdateTaskModel.ttrn_proof_of_compliance == undefined || this.completeUpdateTaskModel.ttrn_proof_of_compliance == null || this.completeUpdateTaskModel.ttrn_proof_of_compliance.length == 0)) {
      this.errorListCompleteTask.push('Required Upload Proof of Compliance.');
      isError = true;
    }

    if (isError)
      return false;

    var jsonData = {
      ttrn_completed_date: (this.completeUpdateTaskModel.ttrn_completed_date == '' || this.completeUpdateTaskModel.ttrn_completed_date == null) ? '' : this.getConvertedDate(this.completeUpdateTaskModel.ttrn_completed_date),
      ttrn_performer_comments: this.completeUpdateTaskModel.ttrn_performer_comments,
      ttrn_reason_for_non_compliance: this.completeUpdateTaskModel.ttrn_reason_for_non_compliance,
      ttrn_ids: [{ ttrn_id: this.completeUpdateTaskModel.ttrn_id }],
      ttrn_event_not_occure: this.completeUpdateTaskModel.ttrn_event_not_occure == true ? 'Yes' : 'No'
    };

    // var data = new FormData();
    // data.append('ttrn_proof_of_compliance', this.completeUpdateTaskModel.ttrn_proof_of_compliance);
    // data.append('jsonString', JSON.stringify(jsonData));

    this.spinner.show();
    this.dashboardtaskdetailsService.SaveTaskCompletion(jsonData, this.completeUpdateTaskModel.ttrn_proof_of_compliance).subscribe(
      res => {
        if (res.response.status == 'Success') {
          this.alertify.success(`Task completed successfully.`);
        }
        else {
          this.alertify.error(`Task not completed successfully.`);
        }
        document.getElementById('CompleteTask_Close').click();
        this.onload();
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong.`);
      }
    );
  }

  UpdateTask() {
    this.errorListUpdateTask = [];
    var isError = false;

    if (!this.completeUpdateTaskModel.ttrn_event_not_occure && this.completeUpdateTaskModel.ttrn_completed_date == '' || this.completeUpdateTaskModel.ttrn_completed_date == null) {
      this.errorListUpdateTask.push('Required Completion Date.');
      isError = true;
    }
    if (!this.completeUpdateTaskModel.ttrn_event_not_occure && (this.completeUpdateTaskModel.ttrn_performer_comments == '' || this.completeUpdateTaskModel.ttrn_performer_comments == null) && this.completeUpdateTaskModel.task_frequency != 'Event_Based') {
      this.errorListUpdateTask.push('Required Remarks.');
      isError = true;
    }
    if (!this.completeUpdateTaskModel.ttrn_event_not_occure && (this.completeUpdateTaskModel.ttrn_performer_comments == '' || this.completeUpdateTaskModel.ttrn_performer_comments == null) && this.completeUpdateTaskModel.task_frequency == 'Event_Based') {
      this.errorListUpdateTask.push('Required Remarks.');
      isError = true;
    }
    if (!this.completeUpdateTaskModel.ttrn_event_not_occure && (this.completeUpdateTaskModel.ttrn_reason_for_non_compliance == '' || this.completeUpdateTaskModel.ttrn_reason_for_non_compliance == null) && this.completeUpdateTaskModel.ttrn_legal_task_status != 'Complied' && (this.completeUpdateTaskModel.ttrn_legal_task_status == 'Delayed' || this.completeUpdateTaskModel.ttrn_legal_task_status == 'Non Complied')) {
      this.errorListUpdateTask.push('Required Reason For Non-Compliance.');
      isError = true;
    }
    if (this.completeUpdateTaskModel.ttrn_document == '1' && !this.completeUpdateTaskModel.ttrn_event_not_occure && (this.completeUpdateTaskModel.ttrn_proof_of_compliance == undefined || this.completeUpdateTaskModel.ttrn_proof_of_compliance == null || this.completeUpdateTaskModel.ttrn_proof_of_compliance.length == 0)) {
      this.errorListUpdateTask.push('Required Upload Proof of Compliance.');
      isError = true;
    }

    if (isError)
      return false;

    var jsonData = {
      ttrn_completed_date: (this.completeUpdateTaskModel.ttrn_completed_date == '' || this.completeUpdateTaskModel.ttrn_completed_date == null) ? '' : this.getConvertedDate(this.completeUpdateTaskModel.ttrn_completed_date),
      ttrn_performer_comments: this.completeUpdateTaskModel.ttrn_performer_comments,
      ttrn_reason_for_non_compliance: this.completeUpdateTaskModel.ttrn_reason_for_non_compliance,
      ttrn_ids: [{ ttrn_id: this.completeUpdateTaskModel.ttrn_id }],
      ttrn_event_not_occure: this.completeUpdateTaskModel.ttrn_event_not_occure == true ? 'Yes' : 'No'
    };

    // var data = new FormData();
    // data.append('ttrn_proof_of_compliance', this.completeUpdateTaskModel.ttrn_proof_of_compliance);
    // data.append('jsonString', JSON.stringify(jsonData));

    this.spinner.show();
    this.dashboardtaskdetailsService.SaveTaskCompletion(jsonData, this.completeUpdateTaskModel.ttrn_proof_of_compliance).subscribe(
      res => {
        if (res.response.status == 'Success') {
          this.alertify.success(`Task updated successfully.`);
        }
        else {
          this.alertify.error(`Task not updated successfully.`);
        }
        document.getElementById('UpdateTask_Close').click();
        this.onload();
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong.`);
      }
    );
  }

  EditDates() {
    // var data = {
    //   validate_dates: "TRUE",
    //   ttrn_prior_days_buffer: this.editDatesModel.ttrn_prior_days_buffer,
    //   ttrn_id: this.editDatesModel.ttrn_id,
    //   ttrn_legal_due_date: this.editDatesModel.ttrn_legal_due_date == '' ? '' : this.getConvertedDate(this.editDatesModel.ttrn_legal_due_date),
    //   ttrn_uh_due_date: this.editDatesModel.ttrn_uh_due_date == '' ? '' : this.getConvertedDate(this.editDatesModel.ttrn_uh_due_date),
    //   ttrn_fh_due_date: this.editDatesModel.ttrn_fh_due_date == '' ? '' : this.getConvertedDate(this.editDatesModel.ttrn_fh_due_date),
    //   ttrn_rw_due_date: this.editDatesModel.ttrn_rw_due_date == '' ? '' : this.getConvertedDate(this.editDatesModel.ttrn_rw_due_date),
    //   ttrn_pr_due_date: this.editDatesModel.ttrn_pr_due_date == '' ? '' : this.getConvertedDate(this.editDatesModel.ttrn_pr_due_date),
    //   ttrn_performer_name: this.editDatesModel.ttrn_performer_name,
    //   user_email: this.editDatesModel.user_email
    // };

    var data = {
      validate_dates: "TRUE",
      ttrn_prior_days_buffer: this.editDatesModel.ttrn_prior_days_buffer,
      ttrn_id: this.editDatesModel.ttrn_id,
      ttrn_legal_due_date: this.editDatesModel.ttrn_legal_due_date == '' ? this.getConvertedDate(this.editDatesModel.Prev_LegalDueDate) : this.getConvertedDate(this.editDatesModel.ttrn_legal_due_date),
      ttrn_uh_due_date: this.editDatesModel.ttrn_uh_due_date == '' ? this.getConvertedDate(this.editDatesModel.Prev_UnitHeadDate) : this.getConvertedDate(this.editDatesModel.ttrn_uh_due_date),
      ttrn_fh_due_date: this.editDatesModel.ttrn_fh_due_date == '' ? this.getConvertedDate(this.editDatesModel.Prev_FunctionDate) : this.getConvertedDate(this.editDatesModel.ttrn_fh_due_date),
      ttrn_rw_due_date: this.editDatesModel.ttrn_rw_due_date == '' ? this.getConvertedDate(this.editDatesModel.Prev_ApproverDate) : this.getConvertedDate(this.editDatesModel.ttrn_rw_due_date),
      ttrn_pr_due_date: this.editDatesModel.ttrn_pr_due_date == '' ? this.getConvertedDate(this.editDatesModel.Prev_OwnerDate) : this.getConvertedDate(this.editDatesModel.ttrn_pr_due_date),
      ttrn_performer_name: this.editDatesModel.ttrn_performer_name,
      user_email: this.editDatesModel.user_email
    };

    this.spinner.show();
    this.dashboardtaskdetailsService.UpdateTasksConfiguration(data).subscribe(
      res => {
        if (res.response.status == 'Success') {
          this.alertify.success(`Dates edited successfully.`);
        }
        else {
          this.alertify.error(`Dates not edited successfully.`);
        }
        document.getElementById('EditDates_Close').click();
        this.onload();
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong.`);
      }
    );
  }

  OpenDeleteTaskModal(ttrn_completed_date, ttrn_id, client_task_id) {

    this.deleteTaskModel.ttrn_completed_date = ttrn_completed_date;
    this.deleteTaskModel.ttrn_id = ttrn_id;
    this.deleteTaskModel.client_task_id = client_task_id;

    document.getElementById('DeleteTask_Open').click();
  }

  OpenReasonForNonComplianceModal(comment, ttrn_id) {
    this.reasonForNonComplianceTask.ttrn_id = ttrn_id;
    this.reasonForNonComplianceTask.ttrn_reason_for_non_compliance = comment;
    this.errorListReasonForNonCompliance = []

    document.getElementById('ReasonForNonCompliance_Open').click();
  }

  OpenReOpenModal(comment, ttrn_id) {
    this.reOpenTaskModel.ttrn_id = ttrn_id;
    this.reOpenTaskModel.reopen_comment = comment;
    this.errorListReopen = [];

    document.getElementById('ReOpenTask_Open').click();
  }

  OpenApproveTaskModal(ttrn_id) {
    this.approveTaskModel.ttrn_id = ttrn_id;

    document.getElementById('ApproveTask_Open').click();
  }

  OpenCompleteTaskModal(ttrn_id, task_frequency, ttrn_legal_task_status, ttrn_document) {
    this.completeUpdateTaskModel.ttrn_id = ttrn_id;
    this.completeUpdateTaskModel.ttrn_completed_date = this.maxDate;
    this.completeUpdateTaskModel.ttrn_event_not_occure = false;
    this.completeUpdateTaskModel.ttrn_ids = [];
    this.completeUpdateTaskModel.ttrn_performer_comments = '';
    this.completeUpdateTaskModel.ttrn_proof_of_compliance = [];
    this.completeUpdateTaskModel.ttrn_reason_for_non_compliance = '';
    this.completeUpdateTaskModel.task_frequency = task_frequency;
    this.completeUpdateTaskModel.ttrn_legal_task_status = ttrn_legal_task_status;
    this.completeUpdateTaskModel.ttrn_document = ttrn_document;

    this.errorListCompleteTask = [];

    document.getElementById('CompleteTask_Open').click();
  }

  maxSize:boolean;
  handleFileInput(event) {
    this.completeUpdateTaskModel.ttrn_proof_of_compliance = [];
    if(event[0].size<10000000 ){
      this.completeUpdateTaskModel.ttrn_proof_of_compliance = event;
      this.maxSize = false;
    }else{
      this.completeUpdateTaskModel.ttrn_proof_of_compliance = null;
      this.maxSize = true;
    }
    
  }

  OpenUpdateTaskModal(ttrn_id, task_frequency, ttrn_legal_task_status, ttrn_document) {
    this.completeUpdateTaskModel.ttrn_id = ttrn_id;
    this.completeUpdateTaskModel.ttrn_completed_date = this.maxDate;
    this.completeUpdateTaskModel.ttrn_event_not_occure = false;
    this.completeUpdateTaskModel.ttrn_ids = [];
    this.completeUpdateTaskModel.ttrn_performer_comments = '';
    this.completeUpdateTaskModel.ttrn_proof_of_compliance = [];
    this.completeUpdateTaskModel.ttrn_reason_for_non_compliance = '';
    this.completeUpdateTaskModel.task_frequency = task_frequency;
    this.completeUpdateTaskModel.ttrn_legal_task_status = ttrn_legal_task_status;
    this.completeUpdateTaskModel.ttrn_document = ttrn_document;

    this.errorListUpdateTask = [];

    document.getElementById('UpdateTask_Open').click();
  }

  OpenEditDatesModal(ttrn_id, ttrn_pr_due_date,
    ttrn_rw_due_date,
    ttrn_fh_due_date,
    ttrn_uh_due_date,
    ttrn_legal_due_date) {
    this.editDatesModel.ttrn_id = ttrn_id;
    this.editDatesModel.Prev_OwnerDate = this.convertDateForBinding(ttrn_pr_due_date);
    this.editDatesModel.Prev_ApproverDate = this.convertDateForBinding(ttrn_rw_due_date);
    this.editDatesModel.Prev_FunctionDate = this.convertDateForBinding(ttrn_fh_due_date);
    this.editDatesModel.Prev_UnitHeadDate = this.convertDateForBinding(ttrn_uh_due_date);
    this.editDatesModel.Prev_LegalDueDate = this.convertDateForBinding(ttrn_legal_due_date);

    this.editDatesModel.ttrn_legal_due_date = this.editDatesModel.Prev_LegalDueDate;
    this.editDatesModel.ttrn_uh_due_date = this.editDatesModel.Prev_UnitHeadDate;
    this.editDatesModel.ttrn_fh_due_date = this.editDatesModel.Prev_FunctionDate;
    this.editDatesModel.ttrn_rw_due_date = this.editDatesModel.Prev_ApproverDate;
    this.editDatesModel.ttrn_pr_due_date = this.editDatesModel.Prev_OwnerDate;

    this.editDatesModel.ttrn_performer_name = JSON.parse(localStorage.getItem('user_info')).user_full_name;;
    this.editDatesModel.user_email = JSON.parse(localStorage.getItem('user_info')).sess_user_email;;

    document.getElementById('EditDates_Open').click();
  }

  convertDateForBinding(dateString) {
    var rowDate = dateString.split('-');

    return `${rowDate[2]}-${rowDate[1]}-${rowDate[0]}`;
  }

  DeleteDocument(udoc_id) {
    var data = {
      udoc_id: udoc_id
    };

    if (window.confirm('Are you sure you want to delete this document ?')) {
      this.spinner.show();
      this.dashboardtaskdetailsService.DeleteTaskDocument(data).subscribe(
        res => {
          if (res.response.status == 'Success') {
            this.alertify.success(`Document deleted successfully.`);
          }
          else {
            this.alertify.error(`Document not deleted successfully.`);
          }
          this.onload();
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
          this.alertify.error(`Something went wrong.`);
        }
      );
    }
  }

  DownloadDocument(udoc_id, udoc_original_file_name) {
    this.spinner.show();
    this.commonService.DownloadFile(udoc_id).subscribe(
      res => {
        const fileURL = URL.createObjectURL(res);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', fileURL);
        link.setAttribute('download', udoc_original_file_name);
        document.body.appendChild(link);
        link.click();
        link.remove();
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong.`);
      }
    );
  }

  getBufferDateDate(date) {
    var today = date;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  bufferDaysOnChange(value) {
    if (parseInt(value) <= 0) {
      this.editDatesModel.ttrn_prior_days_buffer = 0;
      value = 0;
    }

    let LegalDueDate = new Date(this.editDatesModel.ttrn_legal_due_date);

    let UnitHeadDueDate = new Date(this.editDatesModel.ttrn_legal_due_date);
    UnitHeadDueDate.setDate(UnitHeadDueDate.getDate() - parseInt(value));

    let FunctionHeadDueDate = new Date(this.editDatesModel.ttrn_legal_due_date);
    FunctionHeadDueDate.setDate(FunctionHeadDueDate.getDate() - parseInt(value + value));

    let ApproverDueDate = new Date(this.editDatesModel.ttrn_legal_due_date);
    ApproverDueDate.setDate(ApproverDueDate.getDate() - parseInt(value + value + value));

    let OwnerDueDate = new Date(this.editDatesModel.ttrn_legal_due_date);
    OwnerDueDate.setDate(OwnerDueDate.getDate() - parseInt(value + value + value + value));

    this.editDatesModel.ttrn_legal_due_date = this.getBufferDateDate(LegalDueDate);
    this.editDatesModel.ttrn_uh_due_date = this.getBufferDateDate(UnitHeadDueDate);
    this.editDatesModel.ttrn_fh_due_date = this.getBufferDateDate(FunctionHeadDueDate);
    this.editDatesModel.ttrn_rw_due_date = this.getBufferDateDate(ApproverDueDate);
    this.editDatesModel.ttrn_pr_due_date = this.getBufferDateDate(OwnerDueDate);
  }
}
