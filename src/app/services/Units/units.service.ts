import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getList() {
    return this.http.get<any>(this.baseUrl + `listUnits?pagination=false`);
  }

  saveUnit(data) {
    return this.http.post<any>(this.baseUrl + `saveunit?loca_name=${data.loca_name}`, data);
  }

  isLocaNameExist(data) {
    return this.http.get<any>(this.baseUrl + `isLocaNameExist?loca_id=0&loca_name=${data.loca_name}`);
  }

  deleteUnit(data) {
    return this.http.delete<any>(this.baseUrl + `deleteUnit/${data}`);
  }

  getPerticularUnit(data) {
    return this.http.get<any>(this.baseUrl + `unit/${data}`);
  }

  updateUnit(data) {
    return this.http.put<any>(this.baseUrl + `updateunit/${data.loca_id}?loca_name=${data.loca_name}`, data);
  }

  importUnit(data){
    return this.http.post<any>(this.baseUrl + `importunit`, data);
  }
}
