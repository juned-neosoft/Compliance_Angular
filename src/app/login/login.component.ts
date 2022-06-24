import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/Alertify/alertify.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { Login } from '../models/Login/login';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginData = new Login();

  constructor(
    private alertify: AlertifyService,
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    if (!!localStorage.getItem('token')) {
      this.router.navigate([`/home`]);
    }
  }

  ngOnInit() {
  }

  loginUser() {
    this.spinner.show();
    // this.alertify.success('test');
    const data = {
      user_name: this.loginData.user_name,
      password: this.loginData.password
    };

    this.auth.loginUser(data).subscribe(
      res => {
        localStorage.clear();
        localStorage.setItem('token', res.response.token);
        localStorage.setItem('user_info', JSON.stringify(res.response.data));
        this.spinner.hide();
        this.alertify.success(`${this.loginData.user_name} Logged in successfully`);
        this.router.navigate([`/home`]);
      },
      err => {
        this.spinner.hide();
        //this.alertify.error(`${this.loginData.user_name} Logged in fail`);
        this.alertify.error(`You have entered wrong userid or password. Please try again.`);
      }
    );
  }

}
