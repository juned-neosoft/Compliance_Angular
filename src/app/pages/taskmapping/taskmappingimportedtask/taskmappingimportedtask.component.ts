import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskmappingimportedtaskService } from 'src/app/services/Taskmappingimportedtask/taskmappingimportedtask.service';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-taskmappingimportedtask',
  templateUrl: './taskmappingimportedtask.component.html',
  styleUrls: ['./taskmappingimportedtask.component.css']
})
export class TaskmappingimportedtaskComponent implements OnInit {
  public Pagination = new Pagination();
  public responseData: any;
  public TableFilter: string;

  constructor(
    private alertify: AlertifyService,
    private spinner: NgxSpinnerService,
    private taskmappingimportedtaskService: TaskmappingimportedtaskService,
    private router: Router,
    private excelService: ExcelService,
    private pdfService: PdfService
  ) { }

  ngOnInit() {
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;
    this.TableFilter = '';
    this.loadData();
  }
  loadData() {
    this.spinner.show();
    this.taskmappingimportedtaskService.getList().subscribe(
      res => {
        this.spinner.hide();
        this.responseData = res.response.data.imported_tasks;
        this.Pagination.TotalRecords = res.response.data.imported_tasks.length;
      },
      err => {
        this.spinner.hide();
        this.Pagination.TotalRecords = 0;
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
        'Task ID': element.task_lexcare_task_id,
        'Name Of Legislation': element.task_legi_name,
        'Rule': element.task_rule_name,
        'Reference': element.task_reference,
        'Who': element.task_activity_who,
        'When': element.task_activity_when,
        'Activity': element.task_activity,
        'Procedure': element.task_procedure,
        'Impact': element.task_impact,
        'Frequency': element.task_frequency,
        'Due date': element.due_date,
        'Specific Due Date': element.task_specific_due_date
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Task_Mapping_Task_Imported_Export_Excel');
    this.spinner.hide();
  }

  exportPDF() {
    this.spinner.show();
    var countIndex = 1;

    var col = [
      'Sr. No.',
      'Task ID',
      'Name Of Legislation',
      'Rule',
      'Reference',
      'Who',
      'When',
      'Activity',
      'Procedure',
      'Impact',
      'Frequency',
      'Due date',
      'Specific Due Date'
    ];

    var rows: any = [];
    this.responseData.forEach(element => {
      var temp = [
        countIndex,
        element.task_lexcare_task_id,
        element.task_legi_name,
        element.task_rule_name,
        element.task_reference,
        element.task_activity_who,
        element.task_activity_when,
        element.task_activity,
        element.task_procedure,
        element.task_impact,
        element.task_frequency,
        element.due_date,
        element.task_specific_due_date
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Task_Mapping_Task_Imported_Export_PDF');
    this.spinner.hide();
  }
}
