import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  forgetPassword(forgetPassword) {
    return this.http.post(this.baseUrl + `forgotpassword?user_email=${forgetPassword.email}&user_username=${forgetPassword.userName}`, forgetPassword);
  }

  changePassword(changepassword) {
    return this.http.post(this.baseUrl + `changepassword?user_new_password=${changepassword.user_new_password}&user_old_password=${changepassword.user_old_password}`, changepassword);
  }

  GetProfileInfo()
  {
    return this.http.get(this.baseUrl+`myaccount`);
  }
}
