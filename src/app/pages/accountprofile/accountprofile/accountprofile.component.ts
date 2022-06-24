import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from 'src/app/services/Alertify/alertify.service';
import { ForgetPasswordService } from 'src/app/services/ForgetPassword/forget-password.service';

@Component({
  selector: 'app-accountprofile',
  templateUrl: './accountprofile.component.html',
  styleUrls: ['./accountprofile.component.css']
})
export class AccountprofileComponent implements OnInit {
  profileData: any = {};
  constructor(private router: Router, private spinner: NgxSpinnerService, private alertify: AlertifyService, private forgetService: ForgetPasswordService) { }

  ngOnInit() {
    this.spinner.hide();
    this.GetProfileInfo();
  }

  GetProfileInfo() {
    this.spinner.show();

    this.forgetService.GetProfileInfo().subscribe((data:any) => {
      console.log(data)
      this.profileData=data.response.data.user_details;
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        this.alertify.error("Not such user");
      })
  }

  ChangePassword() {
    this.router.navigate(["/change-password"]);
  }

}
