import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Compliancereport } from 'src/app/models/ComplianceReport/compliancereport';
import { Pagination } from 'src/app/models/Pagination/pagination';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { CommonService } from 'src/app/services/Common/common.service';
import { ComplianceService } from 'src/app/services/ComplianceReport/compliance.service';
import { ExcelService } from 'src/app/services/Excel/excel.service';
import { PdfService } from 'src/app/services/PDF/pdf.service';

@Component({
  selector: 'app-compliancereport',
  templateUrl: './compliancereport.component.html',
  styleUrls: ['./compliancereport.component.css'],
  providers: [DatePipe]
})
export class CompliancereportComponent implements OnInit {

  public Pagination = new Pagination();
  public TableFilter = '';
  compliacereport = new Compliancereport();
  myDate = new Date();

  entityList: any = [];
  unitList: any = [];
  functionList: any = [];
  compileList: any = [];
  impactList: any = [];
  ListData: any = [];
  exportbtn: boolean = false;


  constructor(
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private alertify: AlertifyService,
    private compliceService: ComplianceService,
    private excelService: ExcelService,
    private pdfService: PdfService
  ) {
    this.compileList = [
      { compileName: "NA" }, { compileName: "Complied" }, { compileName: "Non-Complied" }, { compileName: "Delayed" },
    ];
    this.impactList = [
      { impactName: "NA" }, { impactName: "Severe" }, { impactName: "Major" }, { impactName: "Moderate" }, { impactName: "Low" },
    ]
  }

  ngOnInit() {
    this.spinner.hide();
    this.Pagination.CurrentPage = 1;
    this.Pagination.ItemsPerPage = 10;
    this.Pagination.TotalRecords = 0;

    this.compliacereport.from_date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.compliacereport.to_date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.BindEntity();
  }

  BindEntity() {
    this.spinner.show();
    this.commonService.getEntities().subscribe((data: any) => {
      this.entityList = [];
      this.entityList = data.response.data.entity_list;
      this.spinner.hide();
    })
  }

  BindUnit($event) {
    this.spinner.show();
    this.commonService.getUnits($event.target.value).subscribe((data: any) => {
      this.unitList = [];
      this.unitList = data.response.data.unit_list;
      this.spinner.hide();
    })
  }

  BindFunction($event) {
    this.spinner.show();
    this.commonService.getFunction($event.target.value).subscribe((data: any) => {
      this.functionList = [];
      this.functionList = data.response.data.function_list;
      this.spinner.hide();
    })
  }

  GenerateReport() {
    this.spinner.show();
    var data = {
      "ChooseROrL": "reportPeriod",
      "legal_status": this.compliacereport.compiled_noncompiled,
      "entity_id": Number(this.compliacereport.entity),
      "unit_id": Number(this.compliacereport.unit),
      "func_id": Number(this.compliacereport.function),
      "exec_id": 0,
      "eval_id": 0,
      "from_date": this.datePipe.transform(this.compliacereport.from_date, "dd-MM-yyyy"),
      "to_date": this.datePipe.transform(this.compliacereport.to_date, "dd-MM-yyyy"),
      "task_impact": this.compliacereport.impact
    }
    this.compliceService.GenerateReport(data).subscribe((data: any) => {
      this.ListData = data.response.data.reportList;
      this.spinner.hide();
    })
  }

  ShowButton() {
    if (this.exportbtn == false) {
      this.exportbtn = true;
    }
    else {
      this.exportbtn = false;
    }
  }

  exportExcel() {
    this.spinner.show();
    var countIndex = 1;
    const sendDataToExport = [];
    this.ListData.forEach(element => {
      const obj = {
        'Sr. No.': countIndex,
        'Client Task ID': element.tmap_client_task_id,
        'Entity': element.entity_name,
        'Unit': element.unit_name,
        'Function': element.function_name,
        'Legislation': element.task_legi_name,
        'Rule': element.task_rule_name,
        'Reference': element.task_reference,
        'Who': element.task_who,
        'When': element.task_when,
        'Activity': element.task_activity,
        'Owner': element.executor_name,
        'Approver': element.evaluator_name,
        'Function Head': element.fun_head_name,
        'Impact': element.task_impact,
        'Original Frequency': '',
        'Frequency': element.task_frequency,
        'Legal Due Date': element.ttrn_legal_due_date,
        'Completed Date': element.ttrn_completed_date,
        'Submitted Date': element.ttrn_submitted_date,
        'Status': element.task_status,
        'Document Attached': element.document_attached === 0 ? "No" : "Yes",
        'Comments': '',
        'Reason For Non-Compliance': ''
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Compliance_Report_Export_Excel');
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
      'Owner',
      'Approver',
      'Function Head',
      'Impact',
      'Original Frequency',
      'Frequency',
      'Legal Due Date',
      'Completed Date',
      'Submitted Date',
      'Status',
      'Document Attached',
      'Comments',
      'Reason For Non-Compliance'
    ];

    var rows: any = [];
    this.ListData.forEach(element => {
      var temp = [
        countIndex,
        element.tmap_client_task_id,
        element.entity_name,
        element.unit_name,
        element.function_name,
        element.task_legi_name,
        element.task_rule_name,
        element.task_reference,
        element.task_who,
        element.task_when,
        element.task_activity,
        element.executor_name,
        element.evaluator_name,
        element.fun_head_name,
        element.task_impact,
        '',
        element.task_frequency,
        element.ttrn_legal_due_date,
        element.ttrn_completed_date,
        '',
        element.task_status,
        element.document_attached === 0 ? "No" : "Yes",
        '',
        ''
      ];

      rows.push(temp);
      countIndex += 1;
    });

    this.pdfService.exportPDF(col, rows, 'Compliance_Report_Export_PDF');
    this.spinner.hide();
  }
}
