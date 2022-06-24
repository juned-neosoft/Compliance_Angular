import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Router } from '@angular/router';
import { TaskmappingassigntaskService } from 'src/app/services/TaskMappingAssignTask/taskmappingassigntask.service';

@Component({
  selector: 'app-import-assign-task',
  templateUrl: './import-assign-task.component.html',
  styleUrls: ['./import-assign-task.component.css']
})
export class ImportAssignTaskComponent implements OnInit {
  @ViewChild('fileuploadcontrol', { static: false })
  FileControl: ElementRef;
  FileName: string;
  frmData = new FormData();
  file;
  constructor(
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private TaskmappingassigntaskService: TaskmappingassigntaskService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinner.hide();
  }

  onFileChange($event) {
    this.FileName = $event.target.files[0].name;
    this.frmData.append('assign_task_list', $event.target.files[0]);
  }

  SubmitForm() {
    this.spinner.show();
    this.TaskmappingassigntaskService.uploadAssignTaskList(this.frmData).subscribe((data: any) => {
      if (data.response.status == "Success") {
        this.FileControl.nativeElement.value = "";
        this.spinner.hide();
        this.alertify.success("File uploaded successfully");
        this.router.navigate(['task-mapping-assign-task']);
      }
      else {
        this.alertify.error("File not uploaded");
        this.spinner.hide();
      }
    })
  }
}
