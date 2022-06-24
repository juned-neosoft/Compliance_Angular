import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    const roleID = parseInt(JSON.parse(localStorage.getItem('user_info')).sess_role_id);
    const userID = parseInt(JSON.parse(localStorage.getItem('user_info')).sess_user_id);
    return this.http.get<any>(this.baseUrl + `getAllUsers`);
    //return this.http.get<any>(this.baseUrl + `listusers?pagination=false&roleID=${roleID}&userID=${userID}`);
  }

  getEntityFunctionUnitList() {
    return this.http.get<any>(this.baseUrl + `getAllMapping`);
  }

  getuseraccess(data) {
    return this.http.post<any>(this.baseUrl + `getuseraccess?user_id=${data}`,'');
  }

  getDesignationList() {
    return this.http.get<any>(this.baseUrl + `listdesignations`);
  }

  getRoleList() {
    return this.http.get<any>(this.baseUrl + `allRoles?page=0&pagination=false`);
  }

  isusernameexists(data) {
    return this.http.get<any>(this.baseUrl + `isusernameexists?user_name=${data.user_username}`);
  }

  saveUser(data) {
    return this.http.post<any>(this.baseUrl + `saveUser`, data);
  }

  getPerticularUsers(data) {
    //console.log(data);
    return this.http.post<any>(this.baseUrl + `editUser?user_id=${data}`,'');
  }

  updateUsers(data) {
    return this.http.put<any>(this.baseUrl + `updateUser?user_id=${data.user_id}`, data);
  }

  updateUserAceess(data){
    return this.http.post<any>(this.baseUrl + `saveuseraccess`, data);
  }

  removeUserAccess(data){
    return this.http.post<any>(this.baseUrl + `removeUserAccess`, data);
  }

  importUsersFromFile(data){
    return this.http.post<any>(this.baseUrl + `importusersfromfile`, data);
  }
}
