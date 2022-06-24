import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LogService } from 'src/app/services/Logs/log.service';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-emaillogs',
  templateUrl: './emaillogs.component.html',
  styleUrls: ['./emaillogs.component.css']
})
export class EmaillogsComponent implements OnInit {
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
    this.logService.GetEmailLog().subscribe((data: any) => {

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
        'Status': element.emailStatus,
        'Tasks ID': element.tasksId
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Email_Logs_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      'Sr. No.',
      'Status',
      'Tasks ID'
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.emailStatus,
        element.tasksId
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Email_Logs_Export_PDF');
    this.spinner.hide();
  }
}


