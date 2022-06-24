import { Component, OnInit } from '@angular/core';
import { ShowcausenoticeService } from 'src/app/services/ShowCauseNotice/showcausenotice.service';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-showcausenotice',
  templateUrl: './showcausenotice.component.html',
  styleUrls: ['./showcausenotice.component.css']
})
export class ShowcausenoticeComponent implements OnInit {
  public Pagination = new Pagination();
  public selectedEntity: number;
  public selectedUnit: number;
  public selectedFunction: number;

  public entityListFromAPI: any;
  public unitListFromAPI: any;
  public functionListFromAPI: any;

  public unitListBinding: any;
  public functionListBinding: any;

  public responseData: any;
  public responseDataFromAPI: any;

  constructor(
    private showcausenoticeService: ShowcausenoticeService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private router: Router,
    private excelService: ExcelService,
    private pdfService: PdfService
  ) {
    this.selectedEntity = 0;
    this.selectedUnit = 0;
    this.selectedFunction = 0;
  }

  ngOnInit() {
    this.spinner.hide();
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.onLoad();
  }

  onSubmit() {
    this.responseData = [];
    if (this.selectedEntity != 0 && this.selectedUnit != 0 && this.selectedFunction != 0) {
      for (let i = 0; i < this.responseDataFromAPI.length; i++) {
        if (this.responseDataFromAPI[i].orga_id == this.selectedEntity
          && this.responseDataFromAPI[i].loca_id == this.selectedUnit
          && this.responseDataFromAPI[i].dept_id == this.selectedFunction) {
          this.responseData.push(this.responseDataFromAPI[i]);
        }
      }
    } else if (this.selectedEntity != 0 && this.selectedUnit != 0) {
      for (let i = 0; i < this.responseDataFromAPI.length; i++) {
        if (this.responseDataFromAPI[i].orga_id == this.selectedEntity
          && this.responseDataFromAPI[i].loca_id == this.selectedUnit) {
          this.responseData.push(this.responseDataFromAPI[i]);

        }
      }

    } else if (this.selectedEntity != 0) {
      for (let i = 0; i < this.responseDataFromAPI.length; i++) {
        if (this.responseDataFromAPI[i].orga_id == this.selectedEntity) {
          this.responseData.push(this.responseDataFromAPI[i]);
        }
      }
    } else {
      this.responseData = this.responseDataFromAPI;
      this.alertify.warning(`All data is shown.`);
    }
    console.log(this.responseData);
  }

  onLoad() {
    this.spinner.show();
    var data = {};
    this.showcausenoticeService.getList(data).subscribe(
      res => {
        this.entityListFromAPI = res.data.DD_data[0].Entity;
        this.unitListFromAPI = res.data.DD_data[0].Unit;
        this.functionListFromAPI = res.data.DD_data[0].Function;

        this.unitListBinding = [];
        this.functionListBinding = [];

        this.responseDataFromAPI = res.data.notice_list;
        this.responseData = this.responseDataFromAPI;
        this.Pagination.TotalRecords = res.data.notice_list.length;

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

  editButton(value) {
    this.router.navigate([`/edit-show-cause-notice/${value}`]);
  }

  changeUnit() {
    this.unitListBinding = [];
    this.functionListBinding = [];
    this.selectedUnit = 0;
    this.selectedFunction = 0;

    for (let i = 0; i < this.unitListFromAPI.length; i++) {
      if (this.unitListFromAPI[i].orga_id == this.selectedEntity) {
        this.unitListBinding.push(this.unitListFromAPI[i]);
      }
    }
  }

  changeFunction() {
    this.functionListBinding = [];
    this.selectedFunction = 0;

    for (let i = 0; i < this.functionListFromAPI.length; i++) {
      if (this.functionListFromAPI[i].loca_id == this.selectedUnit) {
        this.functionListBinding.push(this.functionListFromAPI[i]);
      }
    }
  }

  exportExcel() {
    this.spinner.show();
    var countIndex = 1;
    const sendDataToExport = [];
    this.responseData.forEach(element => {
      const obj = {
        'Sr. No.': countIndex,
        'Entity': element.orga_name,
        'Unit': element.loca_name,
        'Function': element.dept_name,
        'Show Cause Related to': element.related_to,
        'Notice Date': element.notice_date,
        'Received Date': element.recieved_date,
        'Deadline Date': element.deadline_date,
        'Action Taken': element.action_taken,
        'Responsible Person': element.responsible_user_name,
        'Reporting person': element.reporting_user_name,
        'Remainder Date': element.reminder_date,
        'Status': element.status
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Show_Cause_Notice_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      'Sr. No.',
      'Entity',
      'Unit',
      'Function',
      'Show Cause Related to',
      'Notice Date',
      'Received Date',
      'Deadline Date',
      'Action Taken',
      'Responsible Person',
      'Reporting person',
      'Remainder Date',
      'Status'
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.orga_name,
        element.loca_name,
        element.dept_name,
        element.related_to,
        element.notice_date,
        element.recieved_date,
        element.deadline_date,
        element.action_taken,
        element.responsible_user_name,
        element.reporting_user_name,
        element.reminder_date,
        element.status
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Show_Cause_Notice_Export_PDF');
    this.spinner.hide();
  }
}
