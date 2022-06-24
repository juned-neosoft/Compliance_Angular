import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskmappingtaskconfigurationService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  searchConfiguartionPage(data) {
    return this.http.post<any>(this.baseUrl + `searchConfiguartionPage`, data);
  }

  SaveConfiguartionPage(data) {
    return this.http.post<any>(this.baseUrl + `savetasksconfiguration`, data);
  }

  saveDefaultTaskConfiguration(data) {
    return this.http.post<any>(this.baseUrl + `saveDefaultTaskConfiguration`, data);
  }

  getTaskListForDefaultTaskConfiguration(data) {
    return this.http.post<any>(this.baseUrl + `searchTaskForDefaultConfiguration`, data);
  }


}
