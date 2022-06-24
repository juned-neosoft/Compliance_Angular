import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Router } from '@angular/router';
import { FunctionsService } from 'src/app/services/Functions/functions.service';

@Component({
  selector: 'app-import-function',
  templateUrl: './import-function.component.html',
  styleUrls: ['./import-function.component.css']
})
export class ImportFunctionComponent implements OnInit {
  @ViewChild('fileuploadcontrol', { static: false })
  FileControl: ElementRef;
  FileName: string;
  frmData = new FormData();
  file;
  constructor(
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private functionsService: FunctionsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinner.hide();
  }

  onFileChange($event) {
    this.FileName = $event.target.files[0].name;
    this.frmData.append('dept_update_list', $event.target.files[0]);
  }

  SubmitForm() {
    this.spinner.show();
    this.functionsService.importFunction(this.frmData).subscribe((data: any) => {
      if (data.response.status == "Success") {
        this.FileControl.nativeElement.value = "";
        this.spinner.hide();
        this.alertify.success("File uploaded successfully");
        this.router.navigate(['functions']);
      }
      else {
        this.alertify.error("File not uploaded");
        this.spinner.hide();
      }
    })
  }

}
