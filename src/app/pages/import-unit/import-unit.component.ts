import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Router } from '@angular/router';
import { UnitsService } from 'src/app/services/Units/units.service';

@Component({
  selector: 'app-import-unit',
  templateUrl: './import-unit.component.html',
  styleUrls: ['./import-unit.component.css']
})
export class ImportUnitComponent implements OnInit {
  @ViewChild('fileuploadcontrol', { static: false })
  FileControl: ElementRef;
  FileName: string;
  frmData = new FormData();
  file;
  constructor(
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private unitsService: UnitsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinner.hide();
  }

  onFileChange($event) {
    this.FileName = $event.target.files[0].name;
    this.frmData.append('unit_update_list', $event.target.files[0]);
  }

  SubmitForm() {
    this.spinner.show();
    this.unitsService.importUnit(this.frmData).subscribe((data: any) => {
      if (data.response.status == "Success") {
        this.FileControl.nativeElement.value = "";
        this.spinner.hide();
        this.alertify.success("File uploaded successfully");
        this.router.navigate(['units']);
      }
      else {
        this.alertify.error("File not uploaded");
        this.spinner.hide();
      }
    })
  }

}
