import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }
 
  getList() {
    return this.http.get<any>(this.baseUrl + `functions?pagination=false`);
  }

  isExistFunctions(data) {
    return this.http.get<any>(this.baseUrl + `isDeptNameExist?dept_id=0&dept_name=${data.dept_name}`);
  }

  deleteFunctions(data) {
    return this.http.delete<any>(this.baseUrl + `deleteFunction/${data}`);
  }

  saveFunctions(data) {
    return this.http.post<any>(this.baseUrl + `savefunction?dept_name=${data.dept_name}`, data);
  }

  getPerticularFunctions(data) {
    return this.http.get<any>(this.baseUrl + `function/${data}`);
  }

  updateFunctions(data) {
    return this.http.put<any>(this.baseUrl + `updatefunction/${data.dept_id}?dept_name=${data.dept_name}`, data);
  }

  importFunction(data){
    return this.http.post<any>(this.baseUrl + `importfunction`, data);
  }
}
