import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Changepassword } from 'src/app/models/changepassword/changepassword.model';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { ForgetPasswordService } from 'src/app/services/ForgetPassword/forget-password.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  @ViewChild('newpassword',{static: false}) newpasswordElement: ElementRef;
  
  changePassword = new Changepassword();

  constructor(private spinner: NgxSpinnerService, private router: Router, private forgetpasswordService: ForgetPasswordService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.spinner.hide();
    this.AddCursor();
  }

  SubmitForm() {
    this.spinner.show();

    this.forgetpasswordService.changePassword(this.changePassword).subscribe((data: any) => {
      console.log(data);
      if (data.response.status == "Success") {
        setTimeout(() => {
          this.spinner.hide();
          this.alertify.success("Password Changed");
          localStorage.clear();
          this.router.navigate(["/login"]);
        }, 2000)
      }
      else {
        this.spinner.hide();
        this.alertify.error("Password not changed");
      }
    },
      error => {
        this.spinner.hide();
        this.alertify.error("No such user");
      })
  }

  // Add Cursor onload of page in textbox
  AddCursor() {
    setTimeout(() => {
      this.newpasswordElement.nativeElement.focus();
    }, 0);
  }

}
