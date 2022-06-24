import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Router } from '@angular/router';
import { EntityService } from 'src/app/services/Entity/entity.service';

@Component({
  selector: 'app-import-entity',
  templateUrl: './import-entity.component.html',
  styleUrls: ['./import-entity.component.css']
})
export class ImportEntityComponent implements OnInit {
  @ViewChild('fileuploadcontrol', { static: false })
  FileControl: ElementRef;
  FileName: string;
  frmData = new FormData();
  file;
  constructor(
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private entityService: EntityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinner.hide();
  }

  onFileChange($event) {
    this.FileName = $event.target.files[0].name;
    this.frmData.append('entity_update_list', $event.target.files[0]);
  }

  SubmitForm() {
    this.spinner.show();
    this.entityService.importEntity(this.frmData).subscribe((data: any) => {
      if (data.response.status == "Success") {
        this.FileControl.nativeElement.value = "";
        this.spinner.hide();
        this.alertify.success("File uploaded successfully");
        this.router.navigate(['entity']);
      }
      else {
        this.alertify.error("File not uploaded");
        this.spinner.hide();
      }
    })
  }

}
