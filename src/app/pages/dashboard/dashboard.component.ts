import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { DashboardService } from 'src/app/services/Dashboard/dashboard.service';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { Statustabs } from 'src/app/models/Dashboard/statustabs';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public Pagination = new Pagination();
  public statustabs = new Statustabs();
  public responseDataRow: any;
  public responseData: any;
  public filterDataStatus: any;
  public parentData: string;
  public showDashboard = true;
  public showTaskDetails = false;

  public isOverall = false;
  public isEntity = false;
  public isUnit = false;
  public isFunction = false;
  public isFinantial = false;

  public TableFilter = '';

  public entityTableData = [];
  public unitTableData = [];
  public functionTableData = [];
  public finantialTableData = [];

  public overallChartData: any;
  public entityChartData: any;
  public unitChartData: any;
  public functionChartData: any;
  public finantialChartData: any;
adminInfo : any;
  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private dashboardService: DashboardService,
    private excelService: ExcelService,
    private pdfService: PdfService
  ) {
  }

  ngOnInit() {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.responseDataRow = [];
    this.responseData = [];
    this.filterDataStatus = '';
    this.parentData = '';

    this.resetCharts();
    this.onLoad();
    let userdata = JSON.parse(localStorage.getItem('user_info'));
this.adminInfo = userdata.sess_role_id;
    
  }

  onLoad() {
    this.spinner.show();
    var data = {

    };
    this.dashboardService.getTaskListDashboard(data).subscribe(
      res => {
        this.responseDataRow = res.data.taskList;
        this.Pagination.TotalRecords = this.responseData.length;

        this.statustabs.Complied = res.data.Complied;
        this.statustabs.Delayed = res.data.Delayed;
        this.statustabs.NonComplied = res.data.NonComplied;
        this.statustabs.Posing = res.data.PosingRisk;
        // this.statustabs.Complied=res.data.PosingRisk);
        this.statustabs.ReOpened = res.data.ReOpened;
        this.statustabs.WFA = res.data.WaitingForApproval;
        this.statustabs.DelayedReported = res.data.delayed_reported;

        this.filterDataByStatus('complied');
        this.spinner.hide();

        this.entityTableData = this.dataInputForGraphsTables(this.responseDataRow, 'entity');
        this.unitTableData = this.dataInputForGraphsTables(this.responseDataRow, 'unit');
        this.functionTableData = this.dataInputForGraphsTables(this.responseDataRow, 'function');
        this.finantialTableData = this.dataInputForGraphsTables(this.responseDataRow, 'finantial');

        this.overallChartsInput();
        this.entityChartsInput();
        this.unitChartsInput();
        this.functionChartsInput();
        this.finantialChartsInput();
      },
      err => {
        this.spinner.hide();
        this.responseData = [];
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      }
    );
  }

  isShow = false;
  filterDataByStatus(filter) {
    this.TableFilter = '';
    this.TabOnClick('');

    if (filter == 'complied' || filter == 'Complied') {
      filter = 'complied'
      this.filterDataStatus = 'Complied.';
    } else if (filter == 'posingrisk' || filter == 'Posing') {
      filter = 'Posing'
      this.filterDataStatus = 'Posing.';
    } else if (filter == 'noncomplied' || filter == 'Overdue' ) {
      filter = 'Overdue';
      this.filterDataStatus = 'Overdue.';
    } else if (filter == 'watingforapproval' || filter == 'WFA') {
      filter = 'watingforapproval'
      this.filterDataStatus = 'Waiting For Approval.';
    } else if (filter == 'reopen' || filter == 'Re-Opened') {
      filter = 'Re-Opened'
      this.filterDataStatus = 'Re-Opened.';
    } else if (filter == 'delayed' || filter == 'Delayed') {
      filter = 'Delayed';
      this.filterDataStatus = 'Delayed.';
    } else if (filter == 'delayed-reported' || filter == 'Delayed Reported') {
      filter = 'Delayed Reported' 
      this.filterDataStatus = 'Delayed Reported.';
    }

    this.spinner.show();
    this.responseData = [];
    for (let i = 0; i < this.responseDataRow.length; i++) {
      if (this.responseDataRow[i].status.toLowerCase() == filter.toLowerCase()) {
        this.responseData.push(
          this.responseDataRow[i]
        );
      }
    }
    this.spinner.hide();

    document.getElementById('ViewGrid-tab').click();
  }

  filterDataByTabs(searchOn, status, tabName) {
    this.TableFilter = '';
    this.TabOnClick('');

    if (status == 'complied') {
      this.filterDataStatus = searchOn + ', Complied.';
    } else if (status == 'posingrisk') {
      this.filterDataStatus = searchOn + ', Posing.';
    } else if (status == 'noncomplied') {
      this.filterDataStatus = searchOn + ', Non Complied.';
    } else if (status == 'watingforapproval') {
      this.filterDataStatus = searchOn + ', Waiting For Approval.';
    } else if (status == 'reopen') {
      this.filterDataStatus = searchOn + ', Re-Opened.';
    } else if (status == 'delayed') {
      this.filterDataStatus = searchOn + ', Delayed.';
    } else if (status == 'delayed-reported') {
      this.filterDataStatus = searchOn + ', Delayed Reported.';
    }

    this.spinner.show();
    this.responseData = [];

    if (tabName == 'entity') {
      for (let i = 0; i < this.responseDataRow.length; i++) {
        if (this.responseDataRow[i].orga_name.toLowerCase() == searchOn.toLowerCase() && this.responseDataRow[i].status.toLowerCase() == status.toLowerCase()) {
          this.responseData.push(
            this.responseDataRow[i]
          );
        }
      }
    }
    else if (tabName == 'unit') {
      for (let i = 0; i < this.responseDataRow.length; i++) {
        if (this.responseDataRow[i].loca_name.toLowerCase() == searchOn.toLowerCase() && this.responseDataRow[i].status.toLowerCase() == status.toLowerCase()) {
          this.responseData.push(
            this.responseDataRow[i]
          );
        }
      }
    }
    else if (tabName == 'function') {
      for (let i = 0; i < this.responseDataRow.length; i++) {
        if (this.responseDataRow[i].dept_name.toLowerCase() == searchOn.toLowerCase() && this.responseDataRow[i].status.toLowerCase() == status.toLowerCase()) {
          this.responseData.push(
            this.responseDataRow[i]
          );
        }
      }
    }

    this.spinner.hide();

    document.getElementById('ViewGrid-tab').click();
  }

  showTaskDetailsPage(value) {
    window.scroll(0, 0);
    this.parentData = value;
    this.showDashboard = false;
    this.showTaskDetails = true;
  }

  showDashboardPage() {
    window.scroll(0, 0);
    this.parentData = '';
    this.showDashboard = true;
    this.showTaskDetails = false;
  }

  exportExcel() {
    this.spinner.show();
    var countIndex = 1;
    const sendDataToExport = [];
    this.responseData.forEach(element => {
      const obj = {
        'Sr. No.': countIndex,
        'Client Task ID': element.ttrn_client_task_id,
        'Entity': element.orga_name,
        'Unit': element.loca_name,
        'Function': element.dept_name,
        'Legislation': element.task_legi_name,
        'Rule': element.task_rule_name,
        'Reference': element.task_reference,
        'Who': element.task_who,
        'When': element.task_when,
        'Activity': element.task_activity,
        'Impact': element.tsk_impact,
        'Implication': element.implications,
        'Owner': element.task_executor,
        'Approver': element.evaluator,
        'Function Head': element.function_head,
        'Legal Due Date': element.ttrn_legal_due_date,
        'Ttrn ID': '',
        'Comments': element.ttrn_performer_comments,
        'Event_Not_Occured (Yes / No)': ''

      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Dashboard_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      'Sr. No.',
      'Client Task ID',
      'Entity',
      'Unit',
      'Function',
      'Legislation',
      'Rule',
      'Reference',
      'Who',
      'When',
      'Activity',
      'Impact',
      'Implication',
      'Owner',
      'Approver',
      'Function Head',
      'Legal Due Date',
      'Ttrn ID',
      'Comments',
      'Event_Not_Occured (Yes / No)'
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.ttrn_client_task_id,
        element.orga_name,
        element.loca_name,
        element.dept_name,
        element.task_legi_name,
        element.task_rule_name,
        element.task_reference,
        element.task_who,
        element.task_when,
        element.task_activity,
        element.tsk_impact,
        element.implications,
        element.task_executor,
        element.evaluator,
        element.function_head,
        element.ttrn_legal_due_date,
        '',
        element.ttrn_performer_comments,
        ''
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Dashboard_Export_PDF');
    this.spinner.hide();
  }

  // Graph Tab

  TabOnClick(value) {
    if (value == 'overall') {
      this.isOverall = true;
      this.isEntity = false;
      this.isUnit = false;
      this.isFunction = false;
      this.isFinantial = false;
    }
    else if (value == 'entity') {
      this.isOverall = false;
      this.isEntity = true;
      this.isUnit = false;
      this.isFunction = false;
      this.isFinantial = false;
    }
    else if (value == 'unit') {
      this.isOverall = false;
      this.isEntity = false;
      this.isUnit = true;
      this.isFunction = false;
      this.isFinantial = false;
    }
    else if (value == 'function') {
      this.isOverall = false;
      this.isEntity = false;
      this.isUnit = false;
      this.isFunction = true;
      this.isFinantial = false;
    }
    else if (value == 'finantial') {
      this.isOverall = false;
      this.isEntity = false;
      this.isUnit = false;
      this.isFunction = false;
      this.isFinantial = true;
    }
    else {
      this.isOverall = false;
      this.isEntity = false;
      this.isUnit = false;
      this.isFunction = false;
      this.isFinantial = false;
    }
  }

  resetCharts() {
    this.overallChartData = {
      series: [],
      labels: [],
      colors: []
    };

    this.entityChartData = {
      series: [],
      categories: [],
      colors: [],
      Height: 300
    };

    this.unitChartData = {
      series: [],
      categories: [],
      colors: [],
      Height: 300
    };

    this.functionChartData = {
      series: [],
      categories: [],
      colors: [],
      Height: 300
    };

    this.finantialChartData = {
      series: [],
      categories: [],
      colors: [],
      Height: 300
    };
  }

  overallChartsInput() {
    this.overallChartData = {
      series: [
        this.statustabs.Complied,
        this.statustabs.Posing,
        this.statustabs.NonComplied,
        this.statustabs.Delayed,
        this.statustabs.DelayedReported,
        this.statustabs.WFA,
        this.statustabs.ReOpened],
      labels: ['Complied', 'Posing', 'Overdue', 'Delayed', 'Delayed Reported', 'WFA', 'Re-Opened'],
      colors: ['#46dc6b', '#ffff37', '#ff3f3f', '#b7b5b5', '#d5e478', '#71b5e2', '#fdbf5d']
    };
  }

  entityChartsInput() {
    var rowCategories = [];
    var rowSeries = [];
    var lengthCount = 0;

    for (let i = 0; i < this.entityTableData.length; i++) {
      rowCategories.push(this.entityTableData[i].entity);
      lengthCount += 1;
    }

    var obj = {};

    obj['name'] = 'Complied';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Posing';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Overdue';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Delayed';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Delayed Reported';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'WFA';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Re-Opened';
    obj['data'] = [];
    rowSeries.push(obj);

    for (let i = 0; i < this.entityTableData.length; i++) {
      rowSeries[0].data.push(this.entityTableData[i].complied);
      rowSeries[1].data.push(this.entityTableData[i].posing);
      rowSeries[2].data.push(this.entityTableData[i].non_complied);
      rowSeries[3].data.push(this.entityTableData[i].delayed);
      rowSeries[4].data.push(this.entityTableData[i].delayed_reported);
      rowSeries[5].data.push(this.entityTableData[i].wfa);
      rowSeries[6].data.push(this.entityTableData[i].re_opened);
    }

    var setHeight = 0;
    setHeight = 100 + (lengthCount * 40);

    if (lengthCount == 0) {
      setHeight = 350;
    }

    this.entityChartData = {
      series: rowSeries,
      categories: rowCategories,
      colors: ['#46dc6b', '#ffff37', '#ff3f3f', '#b7b5b5', '#d5e478', '#71b5e2', '#fdbf5d'],
      Height: setHeight
    };
  }

  unitChartsInput() {
    var rowCategories = [];
    var rowSeries = [];
    var lengthCount = 0;

    for (let i = 0; i < this.unitTableData.length; i++) {
      rowCategories.push(this.unitTableData[i].unit);
      lengthCount += 1;
    }

    var obj = {};

    obj['name'] = 'Complied';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Posing';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Overdue';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Delayed';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Delayed Reported';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'WFA';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Re-Opened';
    obj['data'] = [];
    rowSeries.push(obj);

    for (let i = 0; i < this.unitTableData.length; i++) {
      rowSeries[0].data.push(this.unitTableData[i].complied);
      rowSeries[1].data.push(this.unitTableData[i].posing);
      rowSeries[2].data.push(this.unitTableData[i].non_complied);
      rowSeries[3].data.push(this.unitTableData[i].delayed);
      rowSeries[4].data.push(this.unitTableData[i].delayed_reported);
      rowSeries[5].data.push(this.unitTableData[i].wfa);
      rowSeries[6].data.push(this.unitTableData[i].re_opened);
    }

    var setHeight = 0;
    setHeight = 100 + (lengthCount * 40);

    if (lengthCount == 0) {
      setHeight = 350;
    }

    this.unitChartData = {
      series: rowSeries,
      categories: rowCategories,
      colors: ['#46dc6b', '#ffff37', '#ff3f3f', '#b7b5b5', '#d5e478', '#71b5e2', '#fdbf5d'],
      Height: setHeight
    };
  }

  functionChartsInput() {
    var rowCategories = [];
    var rowSeries = [];
    var lengthCount = 0;

    for (let i = 0; i < this.functionTableData.length; i++) {
      rowCategories.push(this.functionTableData[i].function);
      lengthCount += 1;
    }

    var obj = {};

    obj['name'] = 'Complied';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Posing';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Overdue';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Delayed';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Delayed Reported';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'WFA';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Re-Opened';
    obj['data'] = [];
    rowSeries.push(obj);

    for (let i = 0; i < this.functionTableData.length; i++) {
      rowSeries[0].data.push(this.functionTableData[i].complied);
      rowSeries[1].data.push(this.functionTableData[i].posing);
      rowSeries[2].data.push(this.functionTableData[i].non_complied);
      rowSeries[3].data.push(this.functionTableData[i].delayed);
      rowSeries[4].data.push(this.functionTableData[i].delayed_reported);
      rowSeries[5].data.push(this.functionTableData[i].wfa);
      rowSeries[6].data.push(this.functionTableData[i].re_opened);
    }

    var setHeight = 0;
    setHeight = 100 + (lengthCount * 40);

    if (lengthCount == 0) {
      setHeight = 350;
    }

    this.functionChartData = {
      series: rowSeries,
      categories: rowCategories,
      colors: ['#46dc6b', '#ffff37', '#ff3f3f', '#b7b5b5', '#d5e478', '#71b5e2', '#fdbf5d'],
      Height: setHeight
    };
  }

  finantialChartsInput() {
    var rowCategories = [];
    var rowSeries = [];
    var lengthCount = 0;

    for (let i = 0; i < this.finantialTableData.length; i++) {
      rowCategories.push(this.finantialTableData[i].year);
      lengthCount += 1;
    }

    var obj = {};

    obj['name'] = 'Complied';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Posing';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Overdue';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Delayed';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Delayed Reported';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'WFA';
    obj['data'] = [];
    rowSeries.push(obj);

    obj = {};

    obj['name'] = 'Re-Opened';
    obj['data'] = [];
    rowSeries.push(obj);

    for (let i = 0; i < this.finantialTableData.length; i++) {
      rowSeries[0].data.push(this.finantialTableData[i].complied);
      rowSeries[1].data.push(this.finantialTableData[i].posing);
      rowSeries[2].data.push(this.finantialTableData[i].non_complied);
      rowSeries[3].data.push(this.finantialTableData[i].delayed);
      rowSeries[4].data.push(this.finantialTableData[i].delayed_reported);
      rowSeries[5].data.push(this.finantialTableData[i].wfa);
      rowSeries[6].data.push(this.finantialTableData[i].re_opened);
    }

    var setHeight = 0;
    setHeight = 100 + (lengthCount * 40);

    if (lengthCount == 0) {
      setHeight = 350;
    }

    this.finantialChartData = {
      series: rowSeries,
      categories: rowCategories,
      colors: ['#46dc6b', '#ffff37', '#ff3f3f', '#b7b5b5', '#d5e478', '#71b5e2', '#fdbf5d'],
      Height: setHeight
    };
  }

  dataInputForGraphsTables(data, tabName) {
    if (tabName == 'entity') {
      var arr = [];
      for (let i = 0; i < data.length; i++) {
        if (arr.indexOf(data[i].orga_name) === -1) {
          arr.push(data[i].orga_name);
        }
      }

      var graphDataTable = [];
      for (let i = 0; i < arr.length; i++) {
        const obj = {};
        obj['entity'] = arr[i];
        obj['entity_id'] = 0;
        obj['complied'] = 0;
        obj['posing'] = 0;
        obj['non_complied'] = 0;
        obj['delayed'] = 0;
        obj['delayed_reported'] = 0;
        obj['wfa'] = 0;
        obj['re_opened'] = 0;

        graphDataTable.push(obj);

        for (let j = 0; j < data.length; j++) {
          graphDataTable[i].entity_id = data[j].orga_id

          if (data[j].status.toLowerCase() == 'complied' && graphDataTable[i].entity == data[j].orga_name) {
            graphDataTable[i].complied = graphDataTable[i].complied + 1;
          }
          else if (data[j].status.toLowerCase() == 'posingrisk' && graphDataTable[i].entity == data[j].orga_name) {
            graphDataTable[i].posing = graphDataTable[i].posing + 1;
          }
          else if (data[j].status.toLowerCase() == 'noncomplied' && graphDataTable[i].entity == data[j].orga_name) {
            graphDataTable[i].non_complied = graphDataTable[i].non_complied + 1;
          }
          else if (data[j].status.toLowerCase() == 'watingforapproval' && graphDataTable[i].entity == data[j].orga_name) {
            graphDataTable[i].wfa = graphDataTable[i].wfa + 1;
          }
          else if (data[j].status.toLowerCase() == 'reopen' && graphDataTable[i].entity == data[j].orga_name) {
            graphDataTable[i].re_opened = graphDataTable[i].re_opened + 1;
          }
          else if (data[j].status.toLowerCase() == 'delayed' && graphDataTable[i].entity == data[j].orga_name) {
            graphDataTable[i].delayed = graphDataTable[i].delayed + 1;
          }
          else if (data[j].status.toLowerCase() == 'delayed-reported' && graphDataTable[i].entity == data[j].orga_name) {
            graphDataTable[i].delayed_reported = graphDataTable[i].delayed_reported + 1;
          }
        }
      }

      return graphDataTable;
    }
    else if (tabName == 'unit') {
      var arr = [];
      for (let i = 0; i < data.length; i++) {
        if (arr.indexOf(data[i].loca_name) === -1) {
          arr.push(data[i].loca_name);
        }
      }

      var graphDataTable = [];
      for (let i = 0; i < arr.length; i++) {
        const obj = {};
        obj['unit'] = arr[i];
        obj['unit_id'] = 0;
        obj['complied'] = 0;
        obj['posing'] = 0;
        obj['non_complied'] = 0;
        obj['delayed'] = 0;
        obj['delayed_reported'] = 0;
        obj['wfa'] = 0;
        obj['re_opened'] = 0;

        graphDataTable.push(obj);

        for (let j = 0; j < data.length; j++) {
          graphDataTable[i].unit_id = data[j].loca_id

          if (data[j].status.toLowerCase() == 'complied' && graphDataTable[i].unit == data[j].loca_name) {
            graphDataTable[i].complied = graphDataTable[i].complied + 1;
          }
          else if (data[j].status.toLowerCase() == 'posingrisk' && graphDataTable[i].unit == data[j].loca_name) {
            graphDataTable[i].posing = graphDataTable[i].posing + 1;
          }
          else if (data[j].status.toLowerCase() == 'noncomplied' && graphDataTable[i].unit == data[j].loca_name) {
            graphDataTable[i].non_complied = graphDataTable[i].non_complied + 1;
          }
          else if (data[j].status.toLowerCase() == 'watingforapproval' && graphDataTable[i].unit == data[j].loca_name) {
            graphDataTable[i].wfa = graphDataTable[i].wfa + 1;
          }
          else if (data[j].status.toLowerCase() == 'reopen' && graphDataTable[i].unit == data[j].loca_name) {
            graphDataTable[i].re_opened = graphDataTable[i].re_opened + 1;
          }
          else if (data[j].status.toLowerCase() == 'delayed' && graphDataTable[i].unit == data[j].loca_name) {
            graphDataTable[i].delayed = graphDataTable[i].delayed + 1;
          }
          else if (data[j].status.toLowerCase() == 'delayed-reported' && graphDataTable[i].unit == data[j].loca_name) {
            graphDataTable[i].delayed_reported = graphDataTable[i].delayed_reported + 1;
          }
        }
      }

      return graphDataTable;
    }
    else if (tabName == 'function') {
      var arr = [];
      for (let i = 0; i < data.length; i++) {
        if (arr.indexOf(data[i].dept_name) === -1) {
          arr.push(data[i].dept_name);
        }
      }

      var graphDataTable = [];
      for (let i = 0; i < arr.length; i++) {
        const obj = {};
        obj['function'] = arr[i];
        obj['function_id'] = 0;
        obj['complied'] = 0;
        obj['posing'] = 0;
        obj['non_complied'] = 0;
        obj['delayed'] = 0;
        obj['delayed_reported'] = 0;
        obj['wfa'] = 0;
        obj['re_opened'] = 0;

        graphDataTable.push(obj);

        for (let j = 0; j < data.length; j++) {
          graphDataTable[i].function_id = data[j].dept_id

          if (data[j].status.toLowerCase() == 'complied' && graphDataTable[i].function == data[j].dept_name) {
            graphDataTable[i].complied = graphDataTable[i].complied + 1;
          }
          else if (data[j].status.toLowerCase() == 'posingrisk' && graphDataTable[i].function == data[j].dept_name) {
            graphDataTable[i].posing = graphDataTable[i].posing + 1;
          }
          else if (data[j].status.toLowerCase() == 'noncomplied' && graphDataTable[i].function == data[j].dept_name) {
            graphDataTable[i].non_complied = graphDataTable[i].non_complied + 1;
          }
          else if (data[j].status.toLowerCase() == 'watingforapproval' && graphDataTable[i].function == data[j].dept_name) {
            graphDataTable[i].wfa = graphDataTable[i].wfa + 1;
          }
          else if (data[j].status.toLowerCase() == 'reopen' && graphDataTable[i].function == data[j].dept_name) {
            graphDataTable[i].re_opened = graphDataTable[i].re_opened + 1;
          }
          else if (data[j].status.toLowerCase() == 'delayed' && graphDataTable[i].function == data[j].dept_name) {
            graphDataTable[i].delayed = graphDataTable[i].delayed + 1;
          }
          else if (data[j].status.toLowerCase() == 'delayed-reported' && graphDataTable[i].function == data[j].dept_name) {
            graphDataTable[i].delayed_reported = graphDataTable[i].delayed_reported + 1;
          }
        }
      }

      return graphDataTable;
    }
    else if (tabName == 'finantial') {
      var arr = [];
      for (let i = 0; i < data.length; i++) {
        if (arr.indexOf(this.getConvertedMonthYear(data[i].ttrn_legal_due_date)) === -1) {
          arr.push(this.getConvertedMonthYear(data[i].ttrn_legal_due_date));
        }
      }

      var graphDataTable = [];
      for (let i = 0; i < arr.length; i++) {
        const obj = {};
        obj['year'] = arr[i];
        obj['complied'] = 0;
        obj['posing'] = 0;
        obj['non_complied'] = 0;
        obj['delayed'] = 0;
        obj['delayed_reported'] = 0;
        obj['wfa'] = 0;
        obj['re_opened'] = 0;

        graphDataTable.push(obj);

        for (let j = 0; j < data.length; j++) {
          graphDataTable[i].function_id = data[j].dept_id

          if (data[j].status.toLowerCase() == 'complied' && graphDataTable[i].year == this.getConvertedMonthYear(data[j].ttrn_legal_due_date)) {
            graphDataTable[i].complied = graphDataTable[i].complied + 1;
          }
          else if (data[j].status.toLowerCase() == 'posingrisk' && graphDataTable[i].year == this.getConvertedMonthYear(data[j].ttrn_legal_due_date)) {
            graphDataTable[i].posing = graphDataTable[i].posing + 1;
          }
          else if (data[j].status.toLowerCase() == 'noncomplied' && graphDataTable[i].year == this.getConvertedMonthYear(data[j].ttrn_legal_due_date)) {
            graphDataTable[i].non_complied = graphDataTable[i].non_complied + 1;
          }
          else if (data[j].status.toLowerCase() == 'watingforapproval' && graphDataTable[i].year == this.getConvertedMonthYear(data[j].ttrn_legal_due_date)) {
            graphDataTable[i].wfa = graphDataTable[i].wfa + 1;
          }
          else if (data[j].status.toLowerCase() == 'reopen' && graphDataTable[i].year == this.getConvertedMonthYear(data[j].ttrn_legal_due_date)) {
            graphDataTable[i].re_opened = graphDataTable[i].re_opened + 1;
          }
          else if (data[j].status.toLowerCase() == 'delayed' && graphDataTable[i].year == this.getConvertedMonthYear(data[j].ttrn_legal_due_date)) {
            graphDataTable[i].delayed = graphDataTable[i].delayed + 1;
          }
          else if (data[j].status.toLowerCase() == 'delayed-reported' && graphDataTable[i].year == this.getConvertedMonthYear(data[j].ttrn_legal_due_date)) {
            graphDataTable[i].delayed_reported = graphDataTable[i].delayed_reported + 1;
          }
        }
      }

      return graphDataTable;
    }
  }

  getConvertedMonthYear(value) {
    var rowDate = value.split('-');
    var month = '';

    if (rowDate[1] == '01') {
      month = 'January';
    }
    else if (rowDate[1] == '02') {
      month = 'February';
    }
    else if (rowDate[1] == '03') {
      month = 'March';
    }
    else if (rowDate[1] == '04') {
      month = 'April';
    }
    else if (rowDate[1] == '05') {
      month = 'May';
    }
    else if (rowDate[1] == '06') {
      month = 'June';
    }
    else if (rowDate[1] == '07') {
      month = 'July';
    }
    else if (rowDate[1] == '08') {
      month = 'August';
    }
    else if (rowDate[1] == '09') {
      month = 'September';
    }
    else if (rowDate[1] == '10') {
      month = 'October';
    }
    else if (rowDate[1] == '11') {
      month = 'November';
    }
    else if (rowDate[1] == '12') {
      month = 'December';
    }

    return `${month}-${rowDate[2]}`;
  }
}
