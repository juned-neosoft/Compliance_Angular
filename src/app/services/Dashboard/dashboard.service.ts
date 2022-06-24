import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getTaskListDashboard(data) {
    return this.http.post<any>(this.baseUrl + `getoverallcompliancestatus`, data);
  }

  getTaskDetails(data) {
    return this.http.post<any>(this.baseUrl + `getdetailsfortask`, data);
  }

  getHistoryOfTask(data) {
    return this.http.post<any>(this.baseUrl + `gethistoryfortask`, data);
  }

  getDetailsOfTask(data) {
    return this.http.post<any>(this.baseUrl + `getdetailsfortask`, data);
  }

}
