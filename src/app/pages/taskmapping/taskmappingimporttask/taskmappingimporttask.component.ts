import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { LegaltaskimportService } from 'src/app/services/LegalTaskImport/legaltaskimport.service';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/Excel/excel.service';

@Component({
  selector: 'app-taskmappingimporttask',
  templateUrl: './taskmappingimporttask.component.html',
  styleUrls: ['./taskmappingimporttask.component.css']
})
export class TaskmappingimporttaskComponent implements OnInit {
  @ViewChild('fileuploadcontrol', { static: false })
  FileControl: ElementRef;
  FileName: string;
  frmData = new FormData();
  NotUploadedData = 0;
  NotUploadedRowData: any = [];
  file;
  constructor(
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private excelService: ExcelService,
    private legalUploadService: LegaltaskimportService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinner.hide();
  }

  onFileChange($event) {
    this.FileName = $event.target.files[0].name;
    this.frmData.append('legal_update_activity_list', $event.target.files[0]);
  }

  SubmitForm() {
    this.spinner.show();
    this.legalUploadService.UploadLeagalTaskImport(this.frmData, this.FileName).subscribe((data: any) => {
      if (data.response.status == "Success" && data.response.data.import_response.neglectedTasks.length == 0) {
        this.NotUploadedData = 0;
        this.NotUploadedRowData = [];
        this.FileControl.nativeElement.value = "";
        this.spinner.hide();
        this.alertify.success("File uploaded successfully");
        this.router.navigate(['task-mapping']);
      }
      else if (data.response.status == "Success" && data.response.data.import_response.neglectedTasks.length != 0) {
        this.NotUploadedData = data.response.data.import_response.neglectedTasks.length;
        this.NotUploadedRowData = data.response.data.import_response.neglectedTasks;
        this.FileControl.nativeElement.value = "";
        this.spinner.hide();
        this.alertify.success("File uploaded successfully");
      }
      else {
        this.alertify.error("File not uploaded");
        this.spinner.hide();
      }
    })
  }

  DownloadErrors(){
    this.spinner.show();
    var countIndex = 1;
    const sendDataToExport = [];
    this.NotUploadedRowData.forEach(element => {
      const obj = {
        'Sr. No.': countIndex,
        'Neglected Id': element.Neglected_Id,
        'Reason for Negligence': element.Reason_for_negligence,
        'Name': element.name
      };
      sendDataToExport.push(obj);
      countIndex += 1;
    });
    this.excelService.exportExcel(sendDataToExport, 'Imported_Error_Excel');
    this.spinner.hide();
  }
}
