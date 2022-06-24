import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskmappingenabledisableService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  searchEnableDisablePage(data) {
    return this.http.post<any>(this.baseUrl + `searchEnableDisablePage`, data);
  }
  searchActivationPage(data) {
    return this.http.post<any>(this.baseUrl + `searchActivationPage`, data);
  }

  EnableDisableStatus(data) {
    return this.http.post<any>(this.baseUrl + `enablingoftasks`, data);
  }

  ActiveInactiveStatus(data) {
    return this.http.post<any>(this.baseUrl + `activationoftasks`, data);
  }

  UpdateTasksConfiguration(data){
    return this.http.post<any>(this.baseUrl + `updatetasksconfiguration`, data);
  }

  getTasksActiveData(data) {
    return this.http.post<any>(this.baseUrl + `getTaskConfDetailsByTrnId`, data);
  }
  
}
