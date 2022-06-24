import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/Users/users.service';

@Component({
  selector: 'app-import-users',
  templateUrl: './import-users.component.html',
  styleUrls: ['./import-users.component.css']
})
export class ImportUsersComponent implements OnInit {
  @ViewChild('fileuploadcontrol', { static: false })
  FileControl: ElementRef;
  FileName: string;
  frmData = new FormData();
  file;
  constructor(
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.spinner.hide();
  }

  onFileChange($event) {
    this.FileName = $event.target.files[0].name;
    this.frmData.append('user_list', $event.target.files[0]);
  }

  SubmitForm() {
    this.spinner.show();
    this.usersService.importUsersFromFile(this.frmData).subscribe((data: any) => {
      console.log(data);
      if (data.response.status == "Success") {
        this.FileControl.nativeElement.value = "";
        this.spinner.hide();
        this.alertify.success("File uploaded successfully");
        this.router.navigate(['users']);
      }
      else {
        this.alertify.error("File not uploaded");
        this.spinner.hide();
      }
    })
  }

}
