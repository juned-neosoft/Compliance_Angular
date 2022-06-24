import { Component, OnInit } from '@angular/core';
import { Taskmappingenabledisable } from 'src/app/models/TaskMappingEnableDisable/taskmappingenabledisable';
import { CommonService } from 'src/app/services/Common/common.service';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskmappingenabledisableService } from 'src/app/services/TaskMappingEnableDisable/taskmappingenabledisable.service';

@Component({
  selector: 'app-taskmappingenabledisable',
  templateUrl: './taskmappingenabledisable.component.html',
  styleUrls: ['./taskmappingenabledisable.component.css']
})
export class TaskmappingenabledisableComponent implements OnInit {
  public taskmappingenabledisableData = new Taskmappingenabledisable();
  public Pagination = new Pagination();
  public showAllchecked = false;

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
  constructor(
    private commonService: CommonService,
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private taskmappingenabledisableService: TaskmappingenabledisableService
  ) {
    this.getEntityListFromAPI = [];
    this.getUnitListFromAPI = [];
    this.getFunctionsListFromAPI = [];
    this.getOwnerListFromAPI = [];
    this.getApproverListFromAPI = [];
    this.getLegislationListFromAPI = [];
    this.getRulesListFromAPI = [];
    this.responseData = [];
  }

  ngOnInit() {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.onLoad();
  }

  onLoad() {
    this.spinner.show();
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
  }

  clear(value) {
    if (value == 'entity') {

    } else if (value == 'unit') {

    } else if (value == 'function') {

    } else if (value == 'owner') {

    } else if (value == 'approver') {

    } else if (value == 'legislation') {

    } else if (value == 'rules') {

    }
  }

  onSearch() {
    this.spinner.show();
    const data = {
      dept_id: parseInt(this.taskmappingenabledisableData.functions.toString()),
      legi_id: parseInt(this.taskmappingenabledisableData.legislation.toString()),
      loca_id: parseInt(this.taskmappingenabledisableData.unit.toString()),
      orga_id: parseInt(this.taskmappingenabledisableData.entity.toString()),
      pr_user_id: parseInt(this.taskmappingenabledisableData.owner.toString()),
      rule_id: parseInt(this.taskmappingenabledisableData.rules.toString()),
      rw_user_id: parseInt(this.taskmappingenabledisableData.approver.toString())
    };
    this.taskmappingenabledisableService.searchEnableDisablePage(data).subscribe(
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
        this.selectedRecords = [];
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
          this.getLegislation();
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
    const data = {
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

  TaskEnableDisable(status, id) {
    const data = {
      operation_to_perform: status,
      tasks_list: [
        { tmap_id: id }
      ]
    };

    this.spinner.show();
    this.taskmappingenabledisableService.EnableDisableStatus(data).subscribe(
      res => {
        this.spinner.hide();
        if (res.response.status == 'Success') {
          this.alertify.success(`Record ${status == 'enable' ? 'Enable' : 'Disable'} successfully.`);
        } else {
          this.alertify.success(`Record not ${status == 'enable' ? 'Enable' : 'Disable'} successfully.`);
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
          tmap_id: this.selectedRecords[i]
        }
      );
    }

    const data = {
      operation_to_perform: status,
      tasks_list: RowData
    };

    this.spinner.show();
    this.taskmappingenabledisableService.EnableDisableStatus(data).subscribe(
      res => {
        this.spinner.hide();
        if (res.response.status == 'Success') {
          this.alertify.success(`(${this.selectedRecords.length}) Records ${status == 'enable' ? 'Enable' : 'Disable'} successfully.`);
        } else {
          this.alertify.success(`(${this.selectedRecords.length}) Records not ${status == 'enable' ? 'Enable' : 'Disable'} successfully.`);
        }
        this.onSearch();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Something went wrong.`);
      }
    );
  }

  checkAllFunction(){
    this.showAllchecked = this.showAllchecked == true ? false : true;
    if (this.showAllchecked == true) {
      this.selectedRecords = [];
      for (let i = 0; i < this.responseData.length; i++) {
        this.selectedRecords.push(parseInt(this.responseData[i].tmap_id));
      }
    }
    else {
      this.selectedRecords = [];
    }
  }
}
