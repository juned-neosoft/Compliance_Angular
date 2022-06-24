import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LogService } from 'src/app/services/Logs/log.service';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-taskconfiguration',
  templateUrl: './taskconfiguration.component.html',
  styleUrls: ['./taskconfiguration.component.css']
})
export class TaskconfigurationComponent implements OnInit {
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
    this.logService.GetTaskConfigLog().subscribe((data: any) => {
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
        'Task ID': element.tasksId,
        'Emcure Task ID': element.lexTasksId,
        'Legal Due Date': element.legalDueDate,
        'Executor Date': element.executorDueDate,
        'Evaluator Date': element.evaluatorDueDate,
        'Function Date': element.functionHeadDueDate,
        'Unit Head Date': element.unitHeadDueDate,
        'Frequency': element.frequency,
        'Prior Days': element.priorDays,
        'Buffer Days': element.bufferDays,
        'Added By': element.addedBy,
        'Time': element.createdTime,
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Tasks_Config_Logs_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      'Sr. No.',
      'Task ID',
      'Emcure Task ID',
      'Legal Due Date',
      'Executor Date',
      'Evaluator Date',
      'Function Date',
      'Unit Head Date',
      'Frequency',
      'Prior Days',
      'Buffer Days',
      'Added By',
      'Time',
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.tasksId,
        element.lexTasksId,
        element.legalDueDate,
        element.executorDueDate,
        element.evaluatorDueDate,
        element.functionHeadDueDate,
        element.unitHeadDueDate,
        element.frequency,
        element.priorDays,
        element.bufferDays,
        element.addedBy,
        element.createdTime,
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Tasks_Config_Logs_Export_PDF');
    this.spinner.hide();
  }
}

