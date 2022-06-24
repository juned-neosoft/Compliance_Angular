import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskmappingchangecomplianceownerService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  SearchComplianceOwnerPage(data) {
    return this.http.post<any>(this.baseUrl + `searchcomplianceownerpage`, data);
  }

  SaveTaskUserMapping(data) {
    return this.http.post<any>(this.baseUrl + `savetasksusermapping`, data);
  }

  ChangeComplianceOwner(data) {
    return this.http.post<any>(this.baseUrl + `changecomplianceowner`, data);
  }
}
