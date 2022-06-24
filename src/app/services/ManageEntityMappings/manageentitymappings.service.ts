import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageentitymappingsService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    return this.http.get<any>(this.baseUrl + `entityMappings?pagination=false`);
  }

  loadEntity() {
    return this.http.get<any>(this.baseUrl + `listallentities?pagination=false`);
  }

  loadUnit() {
    return this.http.get<any>(this.baseUrl + `listallunits?pagination=false`);
  }

  loadFunction() {
    return this.http.get<any>(this.baseUrl + `functions?pagination=false`);
  }

  loadFunctionDepends(data) {
    return this.http.post<any>(this.baseUrl + `getMappedDepartments?enti_loca_id=${data.enti_loca_id}&enti_orga_id=${data.enti_orga_id}`, data);
  }

  getEntityList() {
    return this.http.get<any>(this.baseUrl + `listallentities?pagination=false`);
  }

  getUnitList(data) {
    return this.http.get<any>(this.baseUrl + `getUnitByOrgId/${data}`);
  }

  getFunctionList(data) {
    return this.http.get<any>(this.baseUrl + `getFunctionByLocId/${data}`);
  }

  saveManageEntityMapping(data) {
    return this.http.post<any>(this.baseUrl + `saveEntitiesMapping?enti_orga_id=${data.enti_orga_id}&enti_loca_id=${data.enti_loca_id}`, data.functions_Array)
  }

  importEntityMappingFromFile(data){
    return this.http.post<any>(this.baseUrl + `importentitymappingfromfile`, data);
  }
}
