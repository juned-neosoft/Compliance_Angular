import { Component, OnInit } from '@angular/core';
import { Taskmappingenabledisable } from 'src/app/models/TaskMappingEnableDisable/taskmappingenabledisable';
import { CommonService } from 'src/app/services/Common/common.service';
import { Router } from '@angular/router'
import { Pagination } from 'src/app/models/Pagination/pagination';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskmappingenabledisableService } from 'src/app/services/TaskMappingEnableDisable/taskmappingenabledisable.service';
import { DatePipe } from '@angular/common';
import {SaveConfigurationModel } from 'src/app/models/TaskMappingTaskConfiguration/taskmappingtaskconfiguration';
import { TaskmappingtaskconfigurationService } from 'src/app/services/TaskMappingTaskConfiguration/taskmappingtaskconfiguration.service';

@Component({
  selector: 'app-taskmappingactivetask',
  templateUrl: './taskmappingactivetask.component.html',
  styleUrls: ['./taskmappingactivetask.component.css'],
  providers: [DatePipe]

})
export class TaskmappingactivetaskComponent implements OnInit {

  public taskmappingenabledisableData = new Taskmappingenabledisable();
  public Pagination = new Pagination();
  public showAllchecked = false;

  public OriginalConfigurationModel = new SaveConfigurationModel();
  public NewConfigurationModel = new SaveConfigurationModel();
  public ImpactOnEntity = ['Severe', 'Major', 'Moderate', 'Low'];
  public ImpactOnUnit = [];
  public Impact = [];
  public getFrequencyListFilterFromAPI: any;

  public entityHasError = true;
  public unitHasError = true;
  public functionsHasError = true;

  public selectedRecords = [];

  public getEntityListFromAPI: any;
  public getUnitListFromAPI: any;
  public getFunctionsListFromAPI: any;
  public getOwnerListFromAPI: any;
  public getApproverListFromAPI: any;
  public getLegislationListFromAPI: any;
  public getRulesListFromAPI: any;
  public TaskForChangeComplianceOwnerPageLegislation: any;
  public TaskForChangeComplianceOwnerPageRules: any;

  public responseData: any;
  public statusData: any;
  constructor(
    private commonService: CommonService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private taskmappingenabledisableService: TaskmappingenabledisableService,
    private datePipe: DatePipe,
    private taskmappingtaskconfigurationService: TaskmappingtaskconfigurationService,
  ) {
    this.getEntityListFromAPI = [];
    this.getUnitListFromAPI = [];
    this.getFunctionsListFromAPI = [];
    this.getOwnerListFromAPI = [];
    this.getApproverListFromAPI = [];
    this.getLegislationListFromAPI = [];
    this.getRulesListFromAPI = [];
    this.responseData = [];
    this.statusData = [];
  }

  ngOnInit() {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.onLoad();
  }

  onLoad() {
    this.spinner.show();
    this.statusData = ['Active', 'Inactive'];
    this.commonService.getEntities().subscribe(
      res => {
        this.spinner.hide();
        this.getEntityListFromAPI = res.response.data.entity_list;
        this.getExeAndEvalList();
      },
      err => {
        this.spinner.hide();
        this.getEntityListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    this.spinner.show();
    this.commonService.TaskForChangeComplianceOwnerPage({}).subscribe(
      res => {
        this.spinner.hide();
        this.TaskForChangeComplianceOwnerPageLegislation = res.response.data.mapped_data_list.Filters[0].Legislations;
        this.TaskForChangeComplianceOwnerPageRules = res.response.data.mapped_data_list.Filters[0].Rules;
      },
      err => {
        this.spinner.hide();
        this.TaskForChangeComplianceOwnerPageLegislation = [];
        this.TaskForChangeComplianceOwnerPageRules = [];
        this.alertify.error(`Data not found`);
      }
    );

    this.spinner.show();
    this.commonService.GetFrequencyList().subscribe(
      res => {
        this.getFrequencyListFilterFromAPI = res.response.data;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getFrequencyListFilterFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    this.resetNewConfiguration();
  }

  clear(value) {
    if (value == 'entity') {

    } else if (value == 'unit') {

    } else if (value == 'function') {

    } else if (value == 'owner') {

    } else if (value == 'approver') {

    } else if (value == 'legislation') {

    } else if (value == 'rules') {

    } else if (value == 'status') {

    }
  }

  onSearch() {
    this.spinner.show();
    var data = {
      dept_id: parseInt(this.taskmappingenabledisableData.functions.toString()),
      legi_id: parseInt(this.taskmappingenabledisableData.legislation.toString()),
      loca_id: parseInt(this.taskmappingenabledisableData.unit.toString()),
      orga_id: parseInt(this.taskmappingenabledisableData.entity.toString()),
      pr_user_id: parseInt(this.taskmappingenabledisableData.owner.toString()),
      rule_id: parseInt(this.taskmappingenabledisableData.rules.toString()),
      rw_user_id: parseInt(this.taskmappingenabledisableData.approver.toString()),
      status: parseInt(this.taskmappingenabledisableData.status.toString())
    };
    this.taskmappingenabledisableService.searchActivationPage(data).subscribe(
      res => {
        this.spinner.hide();
        this.responseData = [];
        this.selectedRecords = [];
        this.responseData = res.response.data.all_tasks;
        this.Pagination.TotalRecords = this.responseData.length;
      },
      err => {
        this.spinner.hide();
        this.responseData = [];
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      }
    );
  }

  ValidateEntity(value) {
    if (value === '0' || value === 0) {
      this.getUnitListFromAPI = [];
      this.entityHasError = true;
    } else {
      this.spinner.show();
      this.commonService.getUnits(this.taskmappingenabledisableData.entity).subscribe(
        res => {
          this.spinner.hide();
          this.getUnitListFromAPI = res.response.data.unit_list;
          this.getLegislation();
          this.getExeAndEvalList();
        },
        err => {
          this.spinner.hide();
          this.getUnitListFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );

      this.entityHasError = false;
    }
  }

  ValidateUnit(value) {
    if (value === '0' || value === 0) {
      this.getFunctionsListFromAPI = [];
      this.unitHasError = true;
    } else {
      this.spinner.show();
      this.commonService.getFunction(this.taskmappingenabledisableData.unit).subscribe(
        res => {
          this.spinner.hide();
          this.getFunctionsListFromAPI = res.response.data.function_list;
          this.getExeAndEvalList();
          this.getLegislation()
        },
        err => {
          this.spinner.hide();
          this.getFunctionsListFromAPI = [];
          this.alertify.error(`Data not found`);
        }
      );

      this.unitHasError = false;
    }
  }

  ValidateFunctions(value) {
    if (value === '0' || value === 0) {
      this.functionsHasError = true;
    } else {
      this.getLegislation();
      this.functionsHasError = false;
    }
  }

  getExeAndEvalList() {
    var data = {
      dept_id: parseInt(this.taskmappingenabledisableData.functions.toString()),
      loca_id: parseInt(this.taskmappingenabledisableData.unit.toString()),
      orga_id: parseInt(this.taskmappingenabledisableData.entity.toString())
    }

    this.spinner.show();
    this.commonService.getExeListForActivationPage(data).subscribe(
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

    this.spinner.show();
    this.commonService.getEvalListForActivationPage(data).subscribe(
      res => {
        this.spinner.hide();
        this.getApproverListFromAPI = res.response.data.Evaluator;
      },
      err => {
        this.spinner.hide();
        this.getApproverListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  
  OpenEditDatesModal(item) {
    // this.resetNewConfiguration();
    this.OriginalConfigurationModel = new SaveConfigurationModel();
    
    this.OriginalConfigurationModel.impactOnEntity = item.ttrn_impact_on_organization;
    this.OriginalConfigurationModel.impactOnUnit = item.ttrn_impact_on_unit;
    this.OriginalConfigurationModel.impact = item.ttrn_impact;
    this.OriginalConfigurationModel.frequency = item.ttrn_frequency_for_operation;
    this.OriginalConfigurationModel.daysBuffes = item.ttrn_alert_days;
    this.OriginalConfigurationModel.alertPriorDays = item.ttrn_prior_days_buffer;
    this.OriginalConfigurationModel.legalDueDate = item.ttrn_legal_due_date;
    this.OriginalConfigurationModel.unitHeadDueDate = item.ttrn_uh_due_date;
    this.OriginalConfigurationModel.functionHeadDueDate = item.ttrn_fh_due_date;
    this.OriginalConfigurationModel.approverDueDate = item.ttrn_rw_due_date;
    this.OriginalConfigurationModel.ownerDueDate = item.ttrn_pr_due_date;
    this.OriginalConfigurationModel.backDatesDays = item.ttrn_no_of_back_days_allowed;
    this.OriginalConfigurationModel.firstAlert = item.ttrn_first_alert;
    this.OriginalConfigurationModel.secondAlert = item.ttrn_second_alert;
    this.OriginalConfigurationModel.thirdAlert = item.ttrn_third_alert;
    this.OriginalConfigurationModel.docRadio = item.ttrn_document;
    this.OriginalConfigurationModel.histRadio = item.ttrn_historical;
    this.OriginalConfigurationModel.backDatesRadio = item.ttrn_allow_back_date_completion;
    this.OriginalConfigurationModel.taskMakerCheckerRadio = item.ttrn_allow_approver_reopening;
    this.OriginalConfigurationModel.extraAlert = false;
    this.OriginalConfigurationModel.exec_id = item.exec_id;
    this.OriginalConfigurationModel.tmap_client_tasks_id = item.tmap_client_tasks_id;
    //added for duplicate record and status
    this.OriginalConfigurationModel.ttrn_id = item.ttrn_id;
    this.OriginalConfigurationModel.ttrn_status = item.ttrn_status;
    
    this.resetNewConfigurationWithOld();
    // this.editDatesModel.ttrn_id = ttrn_id;
    // var data={
    //   ttrn_id:this.editDatesModel.ttrn_id
    // }
    // this.spinner.show();
    // this.taskmappingenabledisableService.getTasksActiveData(data).subscribe(
    //   res => {
    //     if (res.response.status == 'Success') {
    //     var  responseDataActive=res.response.data;
    //     console.log("responseDataActive="+responseDataActive);
    //       this.editDatesModel.ttrn_impact_on_organization = responseDataActive.trio;
    // this.editDatesModel.ttrn_impact_on_unit = responseDataActive.tiou;
    // this.editDatesModel.ttrn_impact = responseDataActive.ti;
    // this.editDatesModel.ttrn_frequency_for_operation = responseDataActive.tffo;
    // this.editDatesModel.ttrn_document = responseDataActive.tdoc;
    // this.editDatesModel.ttrn_alert_days = responseDataActive.tald;
    // this.editDatesModel.ttrn_historical = responseDataActive.thist;
    // //this.editDatesModel.ttrn_allow_approver_reopening = ttrn_allow_approver_reopening;
    // this.editDatesModel.ttrn_allow_back_date_completion =responseDataActive.tabdc ;
    
    // this.editDatesModel.ttrn_performer_name = JSON.parse(localStorage.getItem('user_info')).user_full_name;;
    // this.editDatesModel.user_email = JSON.parse(localStorage.getItem('user_info')).sess_user_email;
    // this.editDatesModel.ttrn_prior_days_buffer=responseDataActive.tbd;
    // this.editDatesModel.ttrn_alert_days=responseDataActive.tald;

    // this.editDatesModel.ttrn_legal_due_date = '' ? this.getConvertedDate(responseDataActive.tldd) : this.getConvertedDate(responseDataActive.tldd);
    // console.log("this.editDatesModel.ttrn_legal_due_date="+this.editDatesModel.ttrn_legal_due_date+"this.getConvertedDate(responseDataActive.tldd)="+this.getConvertedDate(responseDataActive.tldd));
    // this.editDatesModel.ttrn_uh_due_date = '' ? this.getConvertedDate(responseDataActive.tuhdd) : this.getConvertedDate(responseDataActive.tuhdd);
    // this.editDatesModel.ttrn_fh_due_date = '' ? this.getConvertedDate(responseDataActive.tfhdd) : this.getConvertedDate(responseDataActive.tfhdd);
    // this.editDatesModel.ttrn_rw_due_date = '' ? this.getConvertedDate(responseDataActive.trwdd) : this.getConvertedDate(responseDataActive.trwdd);
    // this.editDatesModel.ttrn_pr_due_date = '' ? this.getConvertedDate(responseDataActive.tprdd) : this.getConvertedDate(responseDataActive.tprdd);
    // console.log(this.editDatesModel);
    document.getElementById('EditDates_Open').click();
    //     }
    //     else {
    //       this.alertify.error(`Dates not fetched successfully.`);
    //     }
    //    // document.getElementById('EditDates_Close').click();
    //    // this.onLoad();
    //     this.spinner.hide();
    //   },
    //   err => {
    //     this.spinner.hide();
    //     this.alertify.error(`Something went wrong.`);
    //   }
    // );
    
  }
  // convertDateForBinding(dateString) {
  //   if(dateString.includes('_')){

  //     var rowDate = dateString;
  //   }

  //   return `${rowDate[2]}-${rowDate[1]}-${rowDate[0]}`;
  // }

  getLegislation() {
    this.getLegislationListFromAPI = [];
    if (this.taskmappingenabledisableData.entity != 0 && this.taskmappingenabledisableData.unit != 0 && this.taskmappingenabledisableData.functions != 0) {
      for (let i = 0; i < this.TaskForChangeComplianceOwnerPageLegislation.length; i++) {
        if (this.taskmappingenabledisableData.entity == this.TaskForChangeComplianceOwnerPageLegislation[i].orga_id &&
          this.taskmappingenabledisableData.unit == this.TaskForChangeComplianceOwnerPageLegislation[i].loca_id &&
          this.taskmappingenabledisableData.functions == this.TaskForChangeComplianceOwnerPageLegislation[i].dept_id) {
          this.getLegislationListFromAPI.push(this.TaskForChangeComplianceOwnerPageLegislation[i]);
        }
      }
    } else if (this.taskmappingenabledisableData.entity != 0 && this.taskmappingenabledisableData.unit != 0) {
      for (let i = 0; i < this.TaskForChangeComplianceOwnerPageLegislation.length; i++) {
        if (this.taskmappingenabledisableData.entity == this.TaskForChangeComplianceOwnerPageLegislation[i].orga_id &&
          this.taskmappingenabledisableData.unit == this.TaskForChangeComplianceOwnerPageLegislation[i].loca_id) {
          this.getLegislationListFromAPI.push(this.TaskForChangeComplianceOwnerPageLegislation[i]);
        }
      }
    } else if (this.taskmappingenabledisableData.entity != 0) {
      for (let i = 0; i < this.TaskForChangeComplianceOwnerPageLegislation.length; i++) {
        if (this.taskmappingenabledisableData.entity == this.TaskForChangeComplianceOwnerPageLegislation[i].orga_id) {
          this.getLegislationListFromAPI.push(this.TaskForChangeComplianceOwnerPageLegislation[i]);
        }
      }
    }
  }

  getConvertedDate(date) {
    var dateString = date.split('-');
    var dateStringYearSplit=dateString[2].split(' ');

    
    return `${dateStringYearSplit[0]}-${dateString[1]}-${dateString[0]}`
  }
  // EditDates() {
  //   var data = {
  //     validate_dates: "TRUE",
  //     ttrn_prior_days_buffer: this.editDatesModel.ttrn_prior_days_buffer,
  //     ttrn_id: this.editDatesModel.ttrn_id,
  //     ttrn_legal_due_date: this.editDatesModel.ttrn_legal_due_date = '' ? this.getConvertedDate(this.editDatesModel.Prev_LegalDueDate) : this.getConvertedDate(this.editDatesModel.ttrn_legal_due_date),
  //     ttrn_uh_due_date: this.editDatesModel.ttrn_uh_due_date = '' ? this.getConvertedDate(this.editDatesModel.Prev_UnitHeadDate) : this.getConvertedDate(this.editDatesModel.ttrn_uh_due_date),
  //     ttrn_fh_due_date: this.editDatesModel.ttrn_fh_due_date = '' ? this.getConvertedDate(this.editDatesModel.Prev_FunctionDate) : this.getConvertedDate(this.editDatesModel.ttrn_fh_due_date),
  //     ttrn_rw_due_date: this.editDatesModel.ttrn_rw_due_date = '' ? this.getConvertedDate(this.editDatesModel.Prev_ApproverDate) : this.getConvertedDate(this.editDatesModel.ttrn_rw_due_date),
  //     ttrn_pr_due_date: this.editDatesModel.ttrn_pr_due_date = '' ? this.getConvertedDate(this.editDatesModel.Prev_OwnerDate) : this.getConvertedDate(this.editDatesModel.ttrn_pr_due_date),
  //     ttrn_performer_name: this.editDatesModel.ttrn_performer_name,
  //     user_email: this.editDatesModel.user_email
  //   };

  //   this.spinner.show();
  //   this.taskmappingenabledisableService.UpdateTasksConfiguration(data).subscribe(
  //     res => {
  //       if (res.response.status == 'Success') {
  //         this.alertify.success(`Dates edited successfully.`);
  //       }
  //       else {
  //         this.alertify.error(`Dates not edited successfully.`);
  //       }
  //       document.getElementById('EditDates_Close').click();
  //       this.onLoad();
  //       this.spinner.hide();
  //     },
  //     err => {
  //       this.spinner.hide();
  //       this.alertify.error(`Something went wrong.`);
  //     }
  //   );
  // }


  ValidateLegislation(value) {
    this.getRulesListFromAPI = [];
    for (let i = 0; i < this.TaskForChangeComplianceOwnerPageRules.length; i++) {
      if (this.TaskForChangeComplianceOwnerPageRules[i].task_legi_id == this.taskmappingenabledisableData.legislation) {
        this.getRulesListFromAPI.push(this.TaskForChangeComplianceOwnerPageRules[i]);
      }
    }
  }

  checkFunction(value) {
    var isExists = false;
    for (let i = 0; i < this.selectedRecords.length; i++) {
      if (this.selectedRecords[i] == parseInt(value)) {
        isExists = true;
        break;
      }
    }

    if (isExists) {
      const index = this.selectedRecords.indexOf(parseInt(value), 0);
      if (index > -1) {
        this.selectedRecords.splice(index, 1);
      }
    } else {
      this.selectedRecords.push(parseInt(value));
    }
  }

  checkAllFunction(){
    this.showAllchecked = this.showAllchecked == true ? false : true;
    if (this.showAllchecked == true) {
      this.selectedRecords = [];
      for (let i = 0; i < this.responseData.length; i++) {
        this.selectedRecords.push(parseInt(this.responseData[i].ttrn_id));
      }
    }
    else {
      this.selectedRecords = [];
    }
  }

  TaskEnableDisable(status, id) {
    const data =
    {
      operation_to_perform: status,
      tasks_list: [{
        ttrn_id: parseInt(id)
      }]
    };


    this.spinner.show();
    this.taskmappingenabledisableService.ActiveInactiveStatus(data).subscribe(
      res => {
        this.spinner.hide();
        if (res.response.status == 'Success') {
          this.alertify.success(`Record ${status == 'activate' ? 'Active' : 'Inactive'} successfully.`);
        } else {
          this.alertify.success(`Record not ${status == 'activate' ? 'Active' : 'Inactive'} successfully.`);
        }

        this.onSearch();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong.`);
      }
    );
  }

  MultipleTaskEnableDisable(status) {
    const RowData = [];
    for (let i = 0; i < this.selectedRecords.length; i++) {
      RowData.push(
        {
          ttrn_id: this.selectedRecords[i]
        }
      );
    }

    const data = {
      operation_to_perform: status,
      tasks_list: RowData
    };

    this.spinner.show();
    this.taskmappingenabledisableService.ActiveInactiveStatus(data).subscribe(
      res => {
        this.spinner.hide();
        if (res.response.status == 'Success') {
          this.alertify.success(`(${this.selectedRecords.length}) Records ${status == 'activate' ? 'Active' : 'Inactive'} successfully.`);
        } else {
          this.alertify.success(`(${this.selectedRecords.length}) Records not ${status == 'activate' ? 'Active' : 'Inactive'} successfully.`);
        }
        this.onSearch();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong.`);
      }
    );
  }

// Configuration Part Code

changeImpactOnEntity(value) {
  this.Impact = [];
  this.ImpactOnUnit = [];
  this.NewConfigurationModel.impact = '';
  this.NewConfigurationModel.impactOnUnit = '';
  for (let i = 0; i < this.ImpactOnEntity.length; i++) {
    if (this.ImpactOnEntity[i] == value) {
      this.ImpactOnUnit.push(this.ImpactOnEntity[i]);
      this.Impact.push(this.ImpactOnEntity[i]);
      break;
    }
    else {
      this.ImpactOnUnit.push(this.ImpactOnEntity[i]);
      this.Impact.push(this.ImpactOnEntity[i]);
    }
  }
}

bufferDaysOnChange(value, flag) {
  if (parseInt(value) <= 0 || flag==false) {
    this.NewConfigurationModel.daysBuffes = 0;
    value = 0;
  }

  let LegalDueDate = new Date(this.NewConfigurationModel.legalDueDate);

  let UnitHeadDueDate = new Date(this.NewConfigurationModel.legalDueDate);
  UnitHeadDueDate.setDate(UnitHeadDueDate.getDate() - parseInt(value));

  let FunctionHeadDueDate = new Date(this.NewConfigurationModel.legalDueDate);
  FunctionHeadDueDate.setDate(FunctionHeadDueDate.getDate() - parseInt(value + value));

  let ApproverDueDate = new Date(this.NewConfigurationModel.legalDueDate);
  ApproverDueDate.setDate(ApproverDueDate.getDate() - parseInt(value + value + value));

  let OwnerDueDate = new Date(this.NewConfigurationModel.legalDueDate);
  OwnerDueDate.setDate(OwnerDueDate.getDate() - parseInt(value + value + value + value));

  this.NewConfigurationModel.legalDueDate = this.getBufferDateDate(LegalDueDate);
  this.NewConfigurationModel.unitHeadDueDate = this.getBufferDateDate(UnitHeadDueDate);
  this.NewConfigurationModel.functionHeadDueDate = this.getBufferDateDate(FunctionHeadDueDate);
  this.NewConfigurationModel.approverDueDate = this.getBufferDateDate(ApproverDueDate);
  this.NewConfigurationModel.ownerDueDate = this.getBufferDateDate(OwnerDueDate);
}

getBufferDateDate(date) {
  var today = date;
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  return yyyy + '-' + mm + '-' + dd;
}

resetNewConfiguration() {
  this.NewConfigurationModel.legalDueDate = this.getTodaysDate();
  this.NewConfigurationModel.unitHeadDueDate = this.getTodaysDate();
  this.NewConfigurationModel.functionHeadDueDate = this.getTodaysDate();
  this.NewConfigurationModel.approverDueDate = this.getTodaysDate();
  this.NewConfigurationModel.ownerDueDate = this.getTodaysDate();
  this.NewConfigurationModel.firstAlert = this.getTodaysDate();
  this.NewConfigurationModel.secondAlert = this.getTodaysDate();
  this.NewConfigurationModel.thirdAlert = this.getTodaysDate();
}

/**
 * added as per Ketan suggestion
 */
resetNewConfigurationWithOld() {
  this.NewConfigurationModel.legalDueDate = this.convertDateForAPI(this.OriginalConfigurationModel.legalDueDate);
  this.NewConfigurationModel.unitHeadDueDate = this.convertDateForAPI(this.OriginalConfigurationModel.unitHeadDueDate);
  this.NewConfigurationModel.functionHeadDueDate = this.convertDateForAPI(this.OriginalConfigurationModel.functionHeadDueDate);
  this.NewConfigurationModel.approverDueDate = this.convertDateForAPI(this.OriginalConfigurationModel.approverDueDate);
  this.NewConfigurationModel.ownerDueDate = this.convertDateForAPI(this.OriginalConfigurationModel.ownerDueDate);
  
  if(this.OriginalConfigurationModel.firstAlert != '')
    this.NewConfigurationModel.firstAlert = this.convertDateForAPI(this.OriginalConfigurationModel.firstAlert);
  else
    this.NewConfigurationModel.firstAlert = this.getTodaysDate();
  
  if(this.OriginalConfigurationModel.secondAlert != '')
    this.NewConfigurationModel.secondAlert = this.convertDateForAPI(this.OriginalConfigurationModel.secondAlert);
  else
    this.NewConfigurationModel.secondAlert = this.getTodaysDate();
  
  if(this.OriginalConfigurationModel.thirdAlert != '')
    this.NewConfigurationModel.thirdAlert = this.convertDateForAPI(this.OriginalConfigurationModel.thirdAlert);
  else
    this.NewConfigurationModel.thirdAlert = this.getTodaysDate(); 
}


getTodaysDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  return yyyy + '-' + mm + '-' + dd;
}

onConfigurationSubmit() {
  var LegalDueDate = parseInt(this.NewConfigurationModel.legalDueDate.split('-').join(''));
  var UnitHeadDueDate = parseInt(this.NewConfigurationModel.unitHeadDueDate.split('-').join(''));
  var FunctionHeadDueDate = parseInt(this.NewConfigurationModel.functionHeadDueDate.split('-').join(''));
  var ApproverDueDate = parseInt(this.NewConfigurationModel.approverDueDate.split('-').join(''));
  var OwnerDueDate = parseInt(this.NewConfigurationModel.ownerDueDate.split('-').join(''));

  if (OwnerDueDate > ApproverDueDate ||
    OwnerDueDate > FunctionHeadDueDate ||
    OwnerDueDate > UnitHeadDueDate ||
    OwnerDueDate > LegalDueDate) {
    alert('Owner Due Date should be less or equal to higher approver.');
    return false;
  }
  else if (ApproverDueDate > FunctionHeadDueDate ||
    ApproverDueDate > UnitHeadDueDate ||
    ApproverDueDate > LegalDueDate) {
    alert('Approver Due Date should be less or equal to higher approver.');
    return false;
  }
  else if (FunctionHeadDueDate > UnitHeadDueDate ||
    FunctionHeadDueDate > LegalDueDate) {
    alert('Function Head Due Date should be less or equal to higher approver.');
    return false;
  }
  else if (UnitHeadDueDate > LegalDueDate) {
    alert('Unit Head Due Date Date should be less or equal to higher approver.');
    return false;
  }

  var tasks_list_Row = [];

  tasks_list_Row.push({
    "ttrn_client_task_id": this.OriginalConfigurationModel.tmap_client_tasks_id,
    "ttrn_performer_user_id": this.OriginalConfigurationModel.exec_id
  });

  var data = {
    ttrn_id:this.OriginalConfigurationModel.ttrn_id,
    ttrn_status:this.OriginalConfigurationModel.ttrn_status,
    ttrn_legal_due_date: this.convertDateForAPI(this.NewConfigurationModel.legalDueDate),
    ttrn_uh_due_date: this.convertDateForAPI(this.NewConfigurationModel.unitHeadDueDate),
    ttrn_fh_due_date: this.convertDateForAPI(this.NewConfigurationModel.functionHeadDueDate),
    ttrn_rw_due_date: this.convertDateForAPI(this.NewConfigurationModel.approverDueDate),
    ttrn_pr_due_date: this.convertDateForAPI(this.NewConfigurationModel.ownerDueDate),
    ttrn_impact_on_organization: this.NewConfigurationModel.impactOnEntity,
    ttrn_impact_on_unit: this.NewConfigurationModel.impactOnUnit,
    ttrn_impact: this.NewConfigurationModel.impact,
    ttrn_prior_days_buffer: this.NewConfigurationModel.alertPriorDays,
    ttrn_alert_days: this.NewConfigurationModel.daysBuffes,
    ttrn_document: this.NewConfigurationModel.docRadio,
    ttrn_historical: this.NewConfigurationModel.histRadio,
    ttrn_allow_back_date_completion: this.NewConfigurationModel.backDatesRadio,
    ttrn_allow_approver_reopening: this.NewConfigurationModel.taskMakerCheckerRadio,
    ttrn_no_of_back_days_allowed: this.NewConfigurationModel.backDatesDays,
    tasks_list: tasks_list_Row,
    ttrn_frequency_for_operation: this.NewConfigurationModel.frequency,
    validate_dates: "TRUE",
    ttrn_first_alert: this.convertDateForAPI(this.NewConfigurationModel.firstAlert),
    ttrn_second_alert: this.convertDateForAPI(this.NewConfigurationModel.secondAlert),
    ttrn_third_alert: this.convertDateForAPI(this.NewConfigurationModel.thirdAlert),
    ttrn_frequency_for_alerts: this.NewConfigurationModel.frequency
  };

  this.spinner.show();
  this.taskmappingtaskconfigurationService.SaveConfiguartionPage(data).subscribe(
    res => {
      if (res.response.status == 'Success') {
        this.alertify.success(`Configuration saved successfully.`);
        document.getElementById('EditDates_Close').click();
        this.onSearch();
      }
      else {
        this.alertify.error(`Configuration not saved successfully.`);
      }

      this.spinner.hide();
    },
    err => {
      this.spinner.hide();
      this.alertify.error(`Data not found`);
    }
  );
}

convertDateForAPI(getDate) {
  var getDateNew = getDate.split('-');
  return `${getDateNew[2]}-${getDateNew[1]}-${getDateNew[0]}`
}

returnFalse() {
  return false;
}
}
