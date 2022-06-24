import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    return this.http.get<any>(this.baseUrl + `listallentities?pagination=false`);
  }

  getParentDropdownList() {
    return this.http.get<any>(this.baseUrl + `listAllForAddingEntity?pagination=false`);
  }

  saveEntity(data) {
    return this.http.post<any>(this.baseUrl + `saveentity?orga_name=${data.orga_name}&orga_parent_id=${data.orga_parent_id}`, data);
  }

  isExistEntity(data) {
    return this.http.get<any>(this.baseUrl + `isOrgaNameExist?org_id=0&org_name=${data.orga_name}`);
  }

  deleteEntity(data) {
    return this.http.delete<any>(this.baseUrl + `deleteEntity/${data}`);
  }

  getPerticularEntity(data) {
    return this.http.get<any>(this.baseUrl + `entity/${data}`);
  }

  updateEntity(data) {
    return this.http.post<any>(this.baseUrl + `updateentity/${data.orga_id}`, data);
  }

  importEntity(data){
    return this.http.post<any>(this.baseUrl + `importentity`, data);
  }
}
