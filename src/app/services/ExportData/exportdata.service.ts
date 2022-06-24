import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExportdataService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  GetAllTasksForExport() {
    return this.http.post<any>(this.baseUrl + `getalltasksforexport`, {});
  }
}
