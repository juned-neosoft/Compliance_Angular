import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/services/Repository/repository.service';
import { CommonService } from 'src/app/services/Common/common.service';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { Repository } from 'src/app/models/Repository/repository';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  public repository = new Repository();
  public AdvanceSearch: boolean;
  public Pagination = new Pagination();
  public responseData: any;
  public responseDataOnClick: any;
  public searchByID: string;

  public parentData: string;
  public showRepository = true;
  public showTaskDetails = false;

  public getEntityListFromAPI: any;
  public getUnitListFromAPI: any;
  public getFunctionListFromAPI: any;
  public getOwnerListFromAPI: any;
  public getApproverListFromAPI: any;
  public getCategoryOfLawsListFromAPI: any;
  public getTypeOfTasksListFromAPI: any;
  public getFrequencyListFromAPI: any;
  public getEventListFromAPI: any;
  public getLegislationListFromAPI: any;
  public getRuleListFromAPI: any;
  public getRowRuleListFromAPI: any;
  public getSub_EventListFromAPI: any;
  public getRowSub_EventListFromAPI: any;

  constructor(
    private repositoryService: RepositoryService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private router: Router,
    private commonService: CommonService,
    private excelService: ExcelService,
    private pdfService: PdfService
  ) {
    this.AdvanceSearch = false;
  }

  ngOnInit() {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.responseData = [];
    this.responseDataOnClick = [];
    this.parentData = '';
    this.onLoad();
  }

  onLoad() {
    this.spinner.show();

    this.responseData = [];
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

    this.spinner.show();

    this.getCategoryOfLawsListFromAPI = [];
    this.commonService.GetCategoryOfLaws().subscribe(
      res => {
        this.getCategoryOfLawsListFromAPI = res.response.data;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getCategoryOfLawsListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    this.spinner.show();

    this.getTypeOfTasksListFromAPI = [];
    this.commonService.TypeOfTasks().subscribe(
      res => {
        this.getTypeOfTasksListFromAPI = res.response.data;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getTypeOfTasksListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );

    this.spinner.show();

    this.getFrequencyListFromAPI = [];
    this.commonService.GetFrequencyList().subscribe(
      res => {
        this.getFrequencyListFromAPI = res.response.data;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.getFrequencyListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  showTaskDetailsPage(value) {
    window.scroll(0, 0);
    this.parentData = value;
    this.showRepository = false;
    this.showTaskDetails = true;
  }

  showRepositoryPage() {
    window.scroll(0, 0);
    this.parentData = '';
    this.showRepository = true;
    this.showTaskDetails = false;
  }

  onSearch() {
    this.spinner.show();
    var data = {
      orga_id: parseInt(this.repository.entitySearch.toString()),
      loca_id: parseInt(this.repository.unitSearch.toString()),
      dept_id: parseInt(this.repository.functionSearch.toString()),
      evaluator_id: parseInt(this.repository.approverSearch.toString()),
      executor_id: parseInt(this.repository.ownerSearch.toString()),
      cat_law_id: parseInt(this.repository.categoryofLawSearch.toString()),
      impact: this.repository.impactSearch == '' ? null : this.repository.impactSearch,
      proh_pres: this.repository.prohibitivePrescriptiveSearch == '' ? null : this.repository.prohibitivePrescriptiveSearch,
      type_of_task: this.repository.typeOfTaskSearch == '' ? null : this.repository.typeOfTaskSearch,
      frequency: this.repository.frequencySearch == '' ? null : this.repository.frequencySearch,
      task_status: null,
      event: this.repository.eventsSearch == '' ? null : this.repository.eventsSearch,
      sub_event: this.repository.subEventsSearch == '' ? null : this.repository.subEventsSearch,
      task_id: null,
      legi_id: parseInt(this.repository.legislationSearch.toString()),
      rule_id: parseInt(this.repository.ruleSearch.toString())
    };

    this.responseData = [];
    this.repositoryService.getRepositoryList(data).subscribe(
      res => {
        this.responseData = res.response.data.repoData;
        if (this.responseData == undefined) {
          this.responseData = [];
        }
        this.Pagination.TotalRecords = this.responseData.length;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.responseData = [];
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      }
    );
  }

  AdvanceSearchFunction() {
    this.AdvanceSearch = !this.AdvanceSearch;
  }

  DataOnClick(value) {
    this.responseDataOnClick = [];
    for (let i = 0; i < this.responseData.length; i++) {
      if (this.responseData[i].tmap_client_task_id == value) {
        this.responseDataOnClick = this.responseData[i];
        break;
      }
    }
  }

  SearchPerticularID() {
    this.spinner.show();
    var data = {
      orga_id: 0,
      loca_id: 0,
      dept_id: 0,
      evaluator_id: 0,
      executor_id: 0,
      cat_law_id: 0,
      impact: null,
      proh_pres: null,
      type_of_task: null,
      frequency: null,
      task_status: null,
      event: null,
      sub_event: null,
      task_id: this.searchByID,
      legi_id: 0,
      rule_id: 0
    };

    this.responseData = [];
    this.repositoryService.getRepositoryList(data).subscribe(
      res => {
        this.responseData = res.response.data.repoData;
        this.Pagination.TotalRecords = this.responseData ? this.responseData.length : 0;

        this.spinner.hide();
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
    this.getUnitListFromAPI = [];
    this.getFunctionListFromAPI = [];
    this.getOwnerListFromAPI = [];
    this.getApproverListFromAPI = [];

    this.repository.unitSearch = 0;
    this.repository.functionSearch = 0;
    this.repository.ownerSearch = 0;
    this.repository.approverSearch = 0;

    this.spinner.show();
    this.commonService.getUnits(this.repository.entitySearch).subscribe(
      res => {
        this.spinner.hide();
        this.getUnitListFromAPI = res.response.data.unit_list;
        this.getOtherDropdowns();
      },
      err => {
        this.spinner.hide();
        this.getUnitListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  ValidateUnit(value) {
    this.getFunctionListFromAPI = [];
    this.getOwnerListFromAPI = [];
    this.getApproverListFromAPI = [];

    this.repository.functionSearch = 0;
    this.repository.ownerSearch = 0;
    this.repository.approverSearch = 0;

    this.spinner.show();
    this.commonService.getFunction(this.repository.unitSearch).subscribe(
      res => {
        this.spinner.hide();
        this.getFunctionListFromAPI = res.response.data.function_list;
        this.getOtherDropdowns();
      },
      err => {
        this.spinner.hide();
        this.getFunctionListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  ValidateFunction(value) {
    this.getOwnerListFromAPI = [];
    this.getApproverListFromAPI = [];

    this.repository.ownerSearch = 0;
    this.repository.approverSearch = 0;

    this.spinner.show();
    const data = {
      dept_id: parseInt(this.repository.functionSearch.toString()),
      loca_id: parseInt(this.repository.unitSearch.toString()),
      orga_id: parseInt(this.repository.entitySearch.toString())
    };

    this.commonService.GetExeListForChangeOwner(data).subscribe(
      res => {
        this.spinner.hide();
        this.getOwnerListFromAPI = res.response.data.Executor;
        this.getOtherDropdowns();
      },
      err => {
        this.spinner.hide();
        this.getOwnerListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  ValidateOwner(value) {
    this.getApproverListFromAPI = [];

    this.repository.approverSearch = 0;

    this.spinner.show();
    const data = {
      dept_id: parseInt(this.repository.functionSearch.toString()),
      loca_id: parseInt(this.repository.unitSearch.toString()),
      orga_id: parseInt(this.repository.entitySearch.toString())
    };

    this.commonService.GetEvalListForChangeOwner(data).subscribe(
      res => {
        this.spinner.hide();
        this.getApproverListFromAPI = res.response.data.Evaluator;
        this.getOtherDropdowns();
      },
      err => {
        this.spinner.hide();
        this.getApproverListFromAPI = [];
        this.alertify.error(`Data not found`);
      }
    );
  }

  ValidateLegislation(value) {
    this.spinner.show();
    this.getRuleListFromAPI = [];

    for (let i = 0; i < this.getRowRuleListFromAPI.length; i++) {
      if (parseInt(value.toString()) == this.getRowRuleListFromAPI[i].task_legi_id) {
        this.getRuleListFromAPI.push(this.getRowRuleListFromAPI[i]);
      }
    }

    this.spinner.hide();
  }

  ValidateEvents(value) {
    this.spinner.show();
    this.getSub_EventListFromAPI = [];

    for (let i = 0; i < this.getRowSub_EventListFromAPI.length; i++) {
      if (value == this.getRowSub_EventListFromAPI[i].task_Event) {
        this.getSub_EventListFromAPI.push(this.getRowSub_EventListFromAPI[i]);
      }
    }

    this.spinner.hide();
  }

  getOtherDropdowns() {
    this.spinner.show();
    var data = {
      cat_law_id: 0,
      dept_id: parseInt(this.repository.functionSearch.toString()),
      evaluator_id: 0,
      event: null,
      executor_id: 0,
      frequency: null,
      impact: null,
      legi_id: 0,
      loca_id: parseInt(this.repository.unitSearch.toString()),
      orga_id: parseInt(this.repository.entitySearch.toString()),
      proh_pres: null,
      rule_id: 0,
      sub_event: null,
      task_id: null,
      task_status: null,
      type_of_task: null
    }

    this.getEventListFromAPI = [];
    this.getLegislationListFromAPI = [];
    this.getRowRuleListFromAPI = [];
    this.getRowSub_EventListFromAPI = [];

    this.commonService.GetAllTasks(data).subscribe(
      res => {

        this.getEventListFromAPI = res.response.data.TasksFilter[0].Event;
        this.getLegislationListFromAPI = res.response.data.TasksFilter[0].Legislation;
        this.getRowRuleListFromAPI = res.response.data.TasksFilter[0].Rule;
        this.getRowSub_EventListFromAPI = res.response.data.TasksFilter[0].Sub_Event;

        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.alertify.error(`Data not found`);
      }
    );
  }

  exportExcel() {
    this.spinner.show();
    var countIndex = 1;
    const sendDataToExport = [];
    this.responseData.forEach(element => {
      const obj = {
        'Sr. No.': countIndex,
        'Client Task ID': element.tmap_client_task_id,
        'Legislation': element.task_legi_name,
        'Rule': element.task_rule_name,
        'Reference': element.task_reference,
        'Who': element.task_activity_who,
        'When': element.task_activity_when,
        'Activity': element.task_activity,
        'Procedure': element.task_procedure,
        'Impact': element.task_impact,
        'Frequency': element.task_frequency_for_operation,
        'Legal Due date': element.task_legal_due_date,
        'Date': element.task_pr_due_date,
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Repository_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      'Sr. No.',
      'Client Task ID',
      'Legislation',
      'Rule',
      'Reference',
      'Who',
      'When',
      'Activity',
      'Procedure',
      'Impact',
      'Frequency',
      'Legal Due date',
      'Date',
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.tmap_client_task_id,
        element.task_legi_name,
        element.task_rule_name,
        element.task_reference,
        element.task_activity_who,
        element.task_activity_when,
        element.task_activity,
        element.task_procedure,
        element.task_impact,
        element.task_frequency_for_operation,
        element.task_legal_due_date,
        element.task_pr_due_date,
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Repository_Export_PDF');
    this.spinner.hide();
  }
}
