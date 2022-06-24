import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationsService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    return this.http.get<any>(this.baseUrl + `listdesignations`);
  }

  saveDesignations(data) {
    return this.http.post<any>(this.baseUrl + `savedesignations?designation_name=${data.designation_name}`, data);
  }

  deleteDesignations(data) {
    return this.http.delete<any>(this.baseUrl + `deleteDesignation/${data}`);
  }

  getPerticularDesignation(data) {
    return this.http.get<any>(this.baseUrl + `editdesignations/${data}`);
  }

  updateDesignations(data) {
    return this.http.put<any>(this.baseUrl + `update_designation/${data.designation_id}?designation_name=${data.designation_name}`, data);
  }
}
