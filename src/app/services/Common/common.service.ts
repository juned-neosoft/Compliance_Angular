import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // Assign Task
  getCountries() {
    return this.http.get<any>(this.baseUrl + `getdistinctcountries`);
  }

  getEntities() {
    return this.http.get<any>(this.baseUrl + `getentitylist`);
  }

  getState(data) {
    return this.http.get<any>(this.baseUrl + `getallstateforcountry/${data}`);
  }

  getUnits(data) {
    return this.http.get<any>(this.baseUrl + `getunitlist?entity_id=${data}`);
  }

  getLegislation(data) {
    return this.http.get<any>(this.baseUrl + `getalllegi/${data.cat_id}?country_id=${data.country_id}&searching_for=tasksmapping&state_id=${data.state_id}`);
  }

  getCategoryOfLaw(data) {
    return this.http.get<any>(this.baseUrl + `getallcatlaw?country_id=${data.country_id}&searching_for=tasksmapping&state_id=${data.state_id}`);
  }

  getRules(data) {
    return this.http.get<any>(this.baseUrl + `getalllegirule/${data.legi_id}?cat_id=${data.cat_id}&country_id=${data.country_id}&state_id=${data.state_id}`);
  }

  getFunction(data) {
    return this.http.get<any>(this.baseUrl + `getFunction/${data}`);
  }

  getFunctionMultiList(data) {
    return this.http.post<any>(this.baseUrl + `getFunctionlist`, data);
  }

  getOwnerExecutorList(data) {
    return this.http.post<any>(this.baseUrl + `getExecutorList`, data);
  }

  getApproverEvaluatorList(data) {
    return this.http.post<any>(this.baseUrl + `getEvaluatorList`, data);
  }

  getFunctionHeadList(data) {
    return this.http.post<any>(this.baseUrl + `getFunHeadList`, data);
  }

  // Enable/Disable

  getExeListForActivationPage(data) {
    return this.http.post<any>(this.baseUrl + `getExeListForActivationPage?dept_id=${data.dept_id}&loca_id=${data.loca_id}&orga_id=${data.orga_id}`, data);
  }

  getEvalListForActivationPage(data) {
    return this.http.post<any>(this.baseUrl + `getEvalListForActivationPage?dept_id=${data.dept_id}&loca_id=${data.loca_id}&orga_id=${data.orga_id}`, data);
  }

  TaskForChangeComplianceOwnerPage(data) {
    return this.http.post<any>(this.baseUrl + `getTaskForChangeComplianceOwnerPage?pagination=false`, data);
  }

  // Change Compliance Owner

  GetExeListForChangeOwner(data) {
    return this.http.post<any>(this.baseUrl + `getExeListForChangeOwner?dept_id=${data.dept_id}&loca_id=${data.loca_id}&orga_id=${data.orga_id}`, data);
  }

  GetEvalListForChangeOwner(data) {
    return this.http.post<any>(this.baseUrl + `getEvalListForChangeOwner?dept_id=${data.dept_id}&loca_id=${data.loca_id}&orga_id=${data.orga_id}`, data);
  }

  GetFunHeadListForChangeOwner(data) {
    return this.http.post<any>(this.baseUrl + `getFunHeadListForChangeOwner?dept_id=${data.dept_id}&loca_id=${data.loca_id}&orga_id=${data.orga_id}`, data);
  }

  // Repository
  GetCategoryOfLaws() {
    return this.http.get<any>(this.baseUrl + `getCategory`);
  }

  TypeOfTasks() {
    return this.http.get<any>(this.baseUrl + `getTypeOfTask`);
  }

  GetFrequencyList() {
    return this.http.get<any>(this.baseUrl + `getFrequencyList`);
  }

  GetAllTasks(data) {
    return this.http.post<any>(this.baseUrl + `getalltasks`, data);
  }

  DownloadFile(docId): any {
    return this.http.get(this.baseUrl + `downloadProofOfCompliance?udoc_id=${docId}`, { responseType: 'blob' })
  }

}
