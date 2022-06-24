import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    return this.http.get<any>(this.baseUrl + `allRoles?page=0&pagination=false`);
  }
  deleteRole(id) {
    return this.http.delete<any>(this.baseUrl + `deleteRole/${id}`);
  }

  SubmitRole(formvalue)
  {
    return this.http.post(this.baseUrl+`saverole?role_name=${formvalue.user_role_name}`,formvalue.user_role_name);
  }

  EditRole(Id)
  {
    return this.http.get(this.baseUrl+`role/${Id}`);
  }

  UpdateRole(formValue,roleId)
  {
    return this.http.put(this.baseUrl+`updaterole/${roleId}?user_role_name=${formValue.user_role_name}`,formValue);
  }

  CheckRoleExists(rolename)
  {
    return this.http.get(this.baseUrl+`isRoleNameExist?role_name=${rolename}`);
  }
}
