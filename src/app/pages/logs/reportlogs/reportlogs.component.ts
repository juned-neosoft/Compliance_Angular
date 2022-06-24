import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LogService } from 'src/app/services/Logs/log.service';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-reportlogs',
  templateUrl: './reportlogs.component.html',
  styleUrls: ['./reportlogs.component.css']
})
export class ReportlogsComponent implements OnInit {
  public Pagination = new Pagination();
  public responseData: any;
  public TableFilter: string;

  constructor(
    private spinner: NgxSpinnerService,
    private logService: LogService,
    private alertify: AlertifyService,
    private excelService: ExcelService,
    private pdfService: PdfService
  ) { }

  ngOnInit() {
    this.spinner.hide();
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.TableFilter = '';
    this.BindLog();
  }

  BindLog() {
    this.spinner.show();
    this.logService.GetReportLog().subscribe((data: any) => {

      this.responseData = data;
      this.Pagination.TotalRecords = data.length;
      this.spinner.hide();
    },
      err => {
        this.spinner.hide();
        this.Pagination.TotalRecords = 0;
        this.alertify.error(`Data not found`);
      })
  }

  exportExcel() {
    this.spinner.show();
    var countIndex = 1;
    const sendDataToExport = [];
    this.responseData.forEach(element => {
      const obj = {
        'Sr. No.': countIndex,
        'Entity': element.orgaName,
        'Location': element.locaName,
        'Department': element.functionName,
        'Legal Status': element.legalStatus,
        'Tasks Impact': element.tasksImpact,
        'From Date': element.fromDate,
        'To Date': element.toDate,
        'Created Time': element.createdTime,
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Report_Logs_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      'Sr. No.',
      'Entity',
      'Location',
      'Department',
      'Legal Status',
      'Tasks Impact',
      'From Date',
      'To Date',
      'Created Time',
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.orgaName,
        element.locaName,
        element.functionName,
        element.legalStatus,
        element.tasksImpact,
        element.fromDate,
        element.toDate,
        element.createdTime,
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Report_Logs_Export_PDF');
    this.spinner.hide();
  }
}



