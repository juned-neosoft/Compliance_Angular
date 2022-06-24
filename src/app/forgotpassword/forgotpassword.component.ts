import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Forgetpassword } from '../models/ForgetPassword/forgetpassword.model';
import { AlertifyService } from '../services/Alertify/alertify.service';
import { ForgetPasswordService } from '../services/ForgetPassword/forget-password.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  @ViewChild('useremail',{static: false}) useremailElement: ElementRef;
  forgetPassword = new Forgetpassword();

  constructor(private spinner: NgxSpinnerService, private router: Router, private forgetpasswordService: ForgetPasswordService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.spinner.hide();
    this.AddCursor();
  }

  SubmitForm() {
    this.spinner.show();

    this.forgetpasswordService.forgetPassword(this.forgetPassword).subscribe((data: any) => {
      
      if (data.response.status == "Success") {
        setTimeout(() => {
          this.spinner.hide();
          this.alertify.success("Password reset done");
          this.router.navigate(["/login"]);
        }, 2000)
      }
      else {
        this.spinner.hide();
        this.alertify.error("Password not reset");
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
      this.useremailElement.nativeElement.focus();
    }, 0);
  }

}
