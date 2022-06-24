import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LogService } from 'src/app/services/Logs/log.service';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-changecomplianceowner',
  templateUrl: './changecomplianceowner.component.html',
  styleUrls: ['./changecomplianceowner.component.css']
})
export class ChangecomplianceownerComponent implements OnInit {
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
    this.logService.GetComplicanceChangeOwnerLog().subscribe((data: any) => {

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
        'Entity': element.entity,
        'Unit': element.locaName,
        'Dept Name': element.deptName,
        'Executor Name': element.executorName,
        'Evaluator Name': element.evaluatorName,
        'Function Name': element.functionHead,
        'Task ID': element.tasksId,
        'Emcure Task ID': element.lexTasksId,
        'Added By': element.addedBy,
        'Time': element.createdTime,
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Change_Compliance_Owner_Logs_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      'Sr. No.',
      'Entity',
      'Unit',
      'Dept Name',
      'Executor Name',
      'Evaluator Name',
      'Function Name',
      'Task ID',
      'Emcure Task ID',
      'Added By',
      'Time',
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.entity,
        element.locaName,
        element.deptName,
        element.executorName,
        element.evaluatorName,
        element.functionHead,
        element.tasksId,
        element.lexTasksId,
        element.addedBy,
        element.createdTime,
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Change_Compliance_Owner_Logs_Export_PDF');
    this.spinner.hide();
  }
}

