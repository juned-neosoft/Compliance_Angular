import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Router } from '@angular/router';
import { ManageentitymappingsService } from 'src/app/services/ManageEntityMappings/manageentitymappings.service';

@Component({
  selector: 'app-import-manage-entity-mapping',
  templateUrl: './import-manage-entity-mapping.component.html',
  styleUrls: ['./import-manage-entity-mapping.component.css']
})
export class ImportManageEntityMappingComponent implements OnInit {
  @ViewChild('fileuploadcontrol', { static: false })
  FileControl: ElementRef;
  FileName: string;
  frmData = new FormData();
  file;
  constructor(
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private manageentitymappingsService: ManageentitymappingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinner.hide();
  }

  onFileChange($event) {
    this.FileName = $event.target.files[0].name;
    this.frmData.append('entity_mapping_list', $event.target.files[0]);
  }

  SubmitForm() {
    this.spinner.show();
    this.manageentitymappingsService.importEntityMappingFromFile(this.frmData).subscribe((data: any) => {
      if (data.response.status == "Success") {
        this.FileControl.nativeElement.value = "";
        this.spinner.hide();
        this.alertify.success("File uploaded successfully");
        this.router.navigate(['manageentitymappings']);
      }
      else {
        this.alertify.error("File not uploaded");
        this.spinner.hide();
      }
    })
  }

}
